import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CancelPage = () => {
  const navigate = useNavigate();

  // Automatically redirect to the checkout page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/checkout");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-gray-800 p-4">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-red-600 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-4xl font-bold mt-6">Payment Cancelled</h1>
        <p className="mt-4 text-lg">
          Your payment was not completed. Please try again.
        </p>
        <p className="text-sm mt-2 text-gray-600">
          You will be redirected to the checkout page in 5 seconds...
        </p>
        <Link
          to="/checkout"
          className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
