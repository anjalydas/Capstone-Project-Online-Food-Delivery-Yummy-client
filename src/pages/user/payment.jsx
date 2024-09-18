import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get amount from location state
  const { amount } = location.state || { amount: 0 }; // Default to 0 if amount is not passed
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace this with your actual payment processing logic
    const paymentDetails = { paymentMethod, amount, status };

    // Simulate a payment process (replace with actual API call)
    console.log('Payment details submitted:', paymentDetails);

    // Simulate payment success or failure
    const paymentStatus = 'success'; // Change to 'failure' to test failure
    const responseMessage = paymentStatus === 'success'
      ? 'Payment Successful! Thank you for your purchase.'
      : 'Payment Failed. Please try again.';

    setMessage(responseMessage);
    setIsSubmitted(true);

    // Redirect to home page after a delay
    setTimeout(() => {
      navigate('/'); // Redirect to home page
    }, 3000); // Adjust delay as needed
  };

  return (
    <div className="container mx-auto p-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="paymentMethod">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            >
              <option value="" disabled>Select a payment method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
              placeholder="Amount"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Submit Payment
          </button>
        </form>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">{message}</h2>
          <p className="text-gray-700 mb-6">You will be redirected to the home page shortly.</p>
        </div>
      )}
    </div>
  );
}

export default PaymentSummary;
