import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems]= useState ('')
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const user = useSelector((state) => state.login.userId);
  //const userId = user ? user._id : null; 
  useEffect(() => {
 
      const fetchOrders = async (user) => {
        
        try {
          
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/${user}`, {
            withCredentials: true,
          });
          const sortedOrders = response.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          console.log(response);
          console.log("User ID:", user);

          setOrders(sortedOrders);
          setLoading(false);
        } catch (error) {
          setError("Failed to load orders");
          setLoading(false);
        }
      };
      fetchOrders(user);
    
  }, [userLoggedIn]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!userLoggedIn) return <div className="p-6 text-red-500">User not found. Please log in.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order._id} className="border border-gray-300 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800">Order Id: #{order._id}</h2>
              <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600">Total: ₹{order.totalAmount}</p>
              <p className="text-gray-600">Status: {order.orderStatus}</p>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Items:</h3>
                <ul className="list-disc list-inside space-y-2">
                {order.foodItems && order.foodItems.length > 0 ? (
  order.foodItems.map((item) => (
    <div key={item._id}>
      <p>{item.dishName}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ₹{item.totalPrice}</p>
    </div>
  ))
) : (
  <p>No items found</p>
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
