import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  // Automatically redirect to the homepage after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

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
          You will be redirected to the homepage in 5 seconds...
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
