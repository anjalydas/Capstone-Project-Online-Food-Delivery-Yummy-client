import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from '../../components/cartItem.jsx';
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

function Cart() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const user = useSelector((state) => state.login.userId);
  const cartId = useSelector((state) => state.cart);
  console.log("Cart ID from Redux: ", cartId); // Check if cartId is available
  
  const coupons = [
    { id: 1, discount: 30, label: "30% off for First purchase", validUntil: "30 October 2023" },
    { id: 2, discount: 20, label: "20% off for purchase above Rs. 1000", validUntil: "30 October 2023" },
    { id: 3, discount: 10, label: "10% off for purchase above Rs. 500", validUntil: "30 October 2023" },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!userLoggedIn) {
      navigate('/login');
    } else {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setFoodItems(cartItems);
      console.log("Fetched cart items:", cartItems);
      
    }
  }, [navigate, userLoggedIn]);

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = foodItems.map(item =>
      item._id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
    );
    setFoodItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleDelete = (id) => {
    const updatedItems = foodItems.filter(item => item._id !== id);
    setFoodItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const amount = foodItems.reduce((total, item) => {
    const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0);
    return total + itemTotal;
  }, 0);

  const discountedAmount = isNaN(amount) ? 0 : Math.max(0, amount - (amount * discount / 100));

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setDiscount(coupon.discount);
  };

  const clearCart = () => {
    setFoodItems([]);
    localStorage.removeItem('cartItems');
  };

  const makePayment = async (user) => {
    try {
      if (address.length < 5) {
        alert("Please provide a valid address.");
        return;
      }

      if (!user) {
        setError('User is not logged in.');
        return;
      }

      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      
      const orderData = {
        user,
        foodItems: cartItems.map(item => ({
          dishName: item.dishName,
          quantity: item.quantity,
          totalPrice: item.price,
        })),
        shippingAddress: address,
        paymentMethod: 'Credit Card',
        totalAmount: discountedAmount,
        orderStatus: 'Delivered'
      };
      console.log("Order Data:", orderData);
      const createOrderResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        orderData
      );
      console.log("Order Data:", orderData);
      
      console.log('Order created successfully:', createOrderResponse.data);
      console.log("Order Data:", orderData);
      console.log("Cart Items for Payment:", cartItems);
      
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/create-checkout-session`, {
  success_url: 'https://capstone-project-online-food-delivery-yummy-client.vercel.app/success',
  cancel_url: 'https://capstone-project-online-food-delivery-yummy-client.vercel.app/cancel',
        items: cartItems.map(item => ({
          name: item.dishName,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      setSessionId(session.data.sessionId);
      localStorage.setItem('paymentSessionId', session.data.sessionId);
      const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionId });

      if (result.success) {
        console.log('Payment Successful');
        clearCart();
        navigate('/success')
      } else {
        console.log('Stripe error:', result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
      return (
    <main className="container mx-auto p-6">
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {foodItems.length > 0 ? (
            foodItems.map(item => (
              <div key={item._id} className="flex items-center border-b pb-4">
                <div className="flex-grow">
                  <CartItem 
                    item={item}
                    onQuantityChange={updateQuantity}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <input 
          type="text" 
          className="border border-gray-300 rounded-md w-full p-2"
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
       
      </section>

      <section className="mb-6">
        
        <h2 className="text-xl font-semibold mb-2">Available Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map(coupon => (
            <div 
              key={coupon.id} 
              className={`border p-4 rounded-lg cursor-pointer ${selectedCoupon && selectedCoupon.id === coupon.id ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleSelectCoupon(coupon)}
            >
              <h3 className="text-lg font-bold">{coupon.label}</h3>
              <p>Valid until: {coupon.validUntil}</p>
              {selectedCoupon && selectedCoupon.id === coupon.id && (
                <p className="text-green-500 mt-2">Coupon applied!</p>
              )}
            </div>
          ))}
        </div>
        </section>
        <section>
        <h2 className="text-xl font-semibold mb-2">Price Details</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">₹ {amount.toFixed(2)}</span>
          </div>
          {selectedCoupon && (
            <div className="flex justify-between mb-2 text-green-500">
              <span className="font-medium">Discount ({selectedCoupon.label}):</span>
              <span className="font-semibold">-₹ {(amount * discount / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <span className="font-medium">Total:</span>
            <span className="font-semibold">₹ {discountedAmount.toFixed(2)}</span>
          </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          onClick={() => makePayment(user)}
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  </main>
  );
}

export default Cart;
