import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from '../../components/cartItem.jsx';
import { useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";


function Cart() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState(""); // State for delivery address
  const [error, setError] = useState(""); // State for error handling
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const user = useSelector((state) => state.login.user); // Assuming user info is needed

  const coupons = [
    { id: 1, discount: 30, label: "30% off for First purchase", validUntil: "30 October 2023" },
    { id: 2, discount: 20, label: "20% off for purchase above Rs. 1000", validUntil: "30 October 2023" },
    { id: 3, discount: 10, label: "10% off for purchase above Rs. 500 ", validUntil: "30 October 2023" },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (!userLoggedIn) {
      navigate('/login');
    } else {
      // Fetch cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setFoodItems(cartItems);
      console.log("Fetched cart items:", cartItems); // Log fetched cart items
    }
  }, [navigate, userLoggedIn]);
  console.log('User:', user);
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

        const result = await stripe.redirectToCheckout({
            sessionId: session.data.sessionId,
        });

        if (result.error) {
            console.log('Stripe error:', result.error.message);
        }
    } catch (error) {
        console.error('Payment error:', error);
    }
};

// New useEffect to handle payment success
useEffect(() => {
    const fetchPaymentStatus = async () => {
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (sessionId) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payment/status?session_id=${sessionId}`);
                if (response.data.success) {
                    // Payment was successful, clear the cart
                    localStorage.removeItem('cartItems'); // Clear the cart from local storage
                    setFoodItems([]); // Clear the state as well
                    navigate('/'); // Redirect to home page
                }
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        }
    };

    fetchPaymentStatus();
}, [navigate]);

  


  return (
    <main className="container mx-auto p-6">
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {foodItems.length > 0 ? (
            foodItems.map(item => (
              <CartItem key={item._id}
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
            onClick={makePayment}
            className="bg-red-500 text-white px-6 py-2 rounded-md w-full mt-4 hover:bg-red-600"
            disabled={foodItems.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;
