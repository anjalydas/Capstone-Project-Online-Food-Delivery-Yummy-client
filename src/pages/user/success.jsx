import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { changeLoggedinState } from "../../features/login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const SuccessPage = () => {
  const clearCart = () => {
    localStorage.removeItem('cartItems'); 
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);

  useEffect(() => {
    // Update login state on success page load
    dispatch(changeLoggedinState({ userLoggedIn: true }));

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id'); 

    // Create order function
    const createOrder = async () => {
      if (session_id) {
        try {
          const orderData = { /* Add necessary order details here */ };
          const createOrderResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/orders?session_id=${session_id}`, 
            orderData
          );
          console.log('Order created successfully:', createOrderResponse.data);
          console.log("Session ID:", session_id);
        } catch (error) {
          console.error('Error creating order:', error);
        }
      }
    };

    // Call createOrder and clear cart
    createOrder();
    clearCart();

    // Redirect to the orders page after 10 seconds
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 10000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-800 p-4">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-600 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-bold mt-6">Payment Successful!</h1>
        <p className="mt-4 text-lg">
          Thank you for your purchase. Your order is confirmed.
        </p>
        <p className="text-sm mt-2 text-gray-600">
          You will be redirected to your orders page in 10 seconds...
        </p>
        <Link
          to="/orders"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
