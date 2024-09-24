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

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment process based on the method selected
    let paymentDetails = { paymentMethod, amount, status };

    if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
      paymentDetails = { ...paymentDetails, cardDetails };
    } else if (paymentMethod === 'UPI') {
      paymentDetails = { ...paymentDetails, upiDetails };
    }

    // Simulate payment success or failure
    const paymentStatus = paymentMethod === 'Cash on Delivery' ? 'success' : 'success'; // Default to success for COD
    const responseMessage = paymentStatus === 'success'
      ? 'Payment Successful! Thank you for your purchase.'
      : 'Payment Failed. Please try again.';

    setMessage(responseMessage);
    setIsSubmitted(true);

    if (paymentStatus === 'success') {
      // Clear the cart in localStorage
      localStorage.removeItem('cartItems');

      // Optionally, you can update the cart state globally if needed (depends on your app's structure)
      // Example: dispatch(clearCartAction()); if you're using Redux or a similar state management tool
    }

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

          {/* Payment Method Selection */}
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
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {/* Dynamic Fields Based on Payment Method */}
          {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your card number"
                  required
                />
              </div>
              <div className="mb-4 flex gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="CVV"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'UPI' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="upiId">
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                value={upiDetails.upiId}
                onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your UPI ID"
                required
              />
            </div>
          )}

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
