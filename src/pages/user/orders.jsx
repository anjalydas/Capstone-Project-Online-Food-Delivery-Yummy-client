import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const makePayment = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/payment/create-checkout-session', orderData);
            const { sessionId } = response.data;
            
            // Redirect the user to the payment page
            window.location.href = `https://payment-processor.com/session/${sessionId}`; // Update with the correct URL
        } catch (error) {
            console.error("Payment error:", error);
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <h3>Order ID: {order._id}</h3>
                            <p>Status: {order.orderStatus}</p>
                            <p>Total Amount: {order.totalAmount}</p>
                            <p>Items:</p>
                            <ul>
                                {order.foodItems.map((item, index) => (
                                    <li key={index}>
                                        {item.dishName} - Quantity: {item.quantity} - Price: {item.totalPrice}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;
