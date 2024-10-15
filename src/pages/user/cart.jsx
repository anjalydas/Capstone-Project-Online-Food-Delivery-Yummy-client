import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from '../../components/cartItem.jsx';
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { changeLoggedinState } from "../../features/login/loginSlice.js";

function Cart() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);

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
      // Fetch cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setFoodItems(cartItems);
      console.log("Fetched cart items:", cartItems); 
    }
  }, [navigate, userLoggedIn]);

  // Function to clear the cart
  const clearCart = () => {
    setFoodItems([]);
    localStorage.removeItem('cartItems'); 
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = foodItems.map(item =>
      item._id === id ? { ...item, quantity: Math.max(newQuantity, 0) } : item
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

  const discountedAmount = isNaN(amount) ? 0 : amount - (amount * discount / 100);

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setDiscount(coupon.discount);
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/create-checkout-session`, {
        items: foodItems.map(item => ({
          name: item.dishName,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
      
      if (result.error) {
        console.log('Stripe error:', result.error.message);
      }
      else{
        // Clear the cart items after successful payment
        clearCart();
        dispatch(changeLoggedinState({
          userLoggedIn: true,
          userId: user._id,
      }));
        await createOrder();
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (sessionId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payment/session-status?session_id=${sessionId}`);
          if (response.data.success) {
            
            navigate('/orders'); // Navigate to orders page
          } else {
            console.error('Payment was not successful:', response.data);
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }
    };

    fetchPaymentStatus();
  }, [navigate]);

  const createOrder = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const storeName = foodItems.length > 0 ? foodItems[0].storeName : '';

    const orderData = {
      items: foodItems,
      address,
      userId,
      storeName,
    };

    try {
      const createOrderResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders?user=${userId}`, orderData);
      console.log('Order created successfully:', createOrderResponse.data);
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to create order. Please try again.');
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

      {/* Delivery Address Section */}
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

      {/* Coupon Selection Section */}
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
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            onClick={makePayment}
          >
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;
