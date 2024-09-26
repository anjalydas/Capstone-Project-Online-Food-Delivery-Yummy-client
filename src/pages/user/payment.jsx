import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function PaymentSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payuFormData, setPayuFormData] = useState({});

  const handlePayUSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment`, {
        amount: amount,
        productinfo: "Your Product Info",
        firstname: "Customer Name",
        email: "Customer Email",
        phone: "Customer Phone",
      });

      if (response.data) {
        setPayuFormData({
          ...response.data.payuData, // Includes hash, txnid, etc.
          surl: "your-success-url",
          furl: "your-failure-url",
        });
        console.log("PayU Form Data:", payuFormData);

        document.getElementById("payu-form").submit();
      }
    } catch (error) {
      console.error("Error generating PayU hash:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "PayU") {
      handlePayUSubmit();
    } else {
      // Handle other payment methods
    }
  };

  return (
    <div className="container mx-auto p-6">
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
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="" disabled>Select a payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="PayU">PayU</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {paymentMethod === "PayU" && (
          <div>
            {/* Changed this form to a div */}
            <form id="payu-form" action="https://secure.payu.in/_payment" method="POST">
              <input type="hidden" name="key" value={payuFormData.key} />
              <input type="hidden" name="txnid" value={payuFormData.txnid} />
              <input type="hidden" name="amount" value={amount} />
              <input type="hidden" name="productinfo" value={payuFormData.productinfo} />
              <input type="hidden" name="firstname" value={payuFormData.firstname} />
              <input type="hidden" name="email" value={payuFormData.email} />
              <input type="hidden" name="phone" value={payuFormData.phone} />
              <input type="hidden" name="surl" value={payuFormData.surl} />
              <input type="hidden" name="furl" value={payuFormData.furl} />
              <input type="hidden" name="hash" value={payuFormData.hash} />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md">
                Pay with PayU
              </button>
            </form>
          </div>
        )}
      </form>
    </div>
  );
}

export default PaymentSummary;
