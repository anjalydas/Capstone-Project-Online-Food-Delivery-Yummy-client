import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders?user=${userId}`, {
          withCredentials: true,
          
        });
        console.log(response.data.orders); // Log to check the structure
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        setError("Failed to load orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order._id} className="border border-gray-300 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800">Order #{order._id}</h2>
              <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600">Total: ₹{order.totalPrice}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Items:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <li key={item.dishName} className="flex items-center space-x-4">
                        <img
                          src={item.image || "https://via.placeholder.com/100"} // Use a placeholder image if none available
                          alt={item.dishName}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <span className="font-semibold">{item.dishName}</span>
                          <span className="text-gray-500"> x {item.quantity}</span>
                          <div className="text-gray-600">₹{item.price}</div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No items found</li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
