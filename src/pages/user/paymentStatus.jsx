// PaymentStatus.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  const handleAction = () => {
    if (status === 'success') {
      navigate('/cart');
    } else {
      navigate('/payment-gateway');
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        status === 'success' ? 'bg-green-100' : 'bg-red-100'
      }`}
    >
      <div className="bg-white p-8 rounded shadow-md text-center">
        {status === 'success' ? (
          <>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-700 mb-6">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
            <button
              onClick={handleAction}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
            >
              View My Orders
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-gray-700 mb-6">
              Unfortunately, your payment could not be processed. Please try again.
            </p>
            <button
              onClick={handleAction}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            >
              Retry Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentStatus;
