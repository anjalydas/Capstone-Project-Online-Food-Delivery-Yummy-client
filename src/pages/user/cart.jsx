import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from '../../components/cartItem.jsx'; // Ensure this component is defined
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

function Cart() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const user = useSelector((state) => state.login.user)
  const coupons = [
    { id: 1, discount: 30, label: "30% off for First purchase", validUntil: "30 October 2023" },
    { id: 2, discount: 20, label: "20% off for purchase above Rs. 1000", validUntil: "30 October 2023" },
    { id: 3, discount: 10, label: "10% off for purchase above Rs. 500", validUntil: "30 October 2023" },
  ];
  useEffect(() => {
    const checkUser = async () => {
      try {
        if (user && user._id) {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${user._id}`, { withCredentials: true });
          if (res.data && res.data.success) {
            localStorage.setItem('token', res.data.token);
          }
        }

        if (!userLoggedIn) {
          navigate('/login');
        } else {
          const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          setFoodItems(cartItems);
        }
      } catch (error) {
        console.error("User check error:", error);
      }
    };

    checkUser();
  }, [navigate, userLoggedIn, user]);

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

  const amount = foodItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedAmount = amount - (amount * discount / 100);

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
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (sessionId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payment/status?session_id=${sessionId}`);
          if (response.data.success) {
            await createOrder();
            localStorage.removeItem('cartItems');
            dispatch(clearCart());
            navigate('/order-confirmation');
          } else {
            console.error('Payment was not successful:', response.data);
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }
    };

    fetchPaymentStatus();
  }, [dispatch, navigate]);

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
      const createOrderResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders/${userId}`, orderData);
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
              <CartItem 
                key={item._id}
                item={item}
                onQuantityChange={updateQuantity}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
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
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium">Delivery Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your address"
              required
            />
          </div>
          <button
            onClick={makePayment}
            className="bg-red-500 text-white px-6 py-2 rounded-md w-full mt-4 hover:bg-red-600"
            disabled={foodItems.length === 0 || !address}
          >
            Proceed to Payment
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </section>
    </main>
  );
}

export default Cart;
