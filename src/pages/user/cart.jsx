import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from '../../features/cart/cartSlice.js';
import { CartItem } from '../../components/cartItem.jsx';

function Cart() {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    

   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setFoodItems(cartItems);
  }, []);
  
  const updateQuantity = (id, newQuantity) => {
    const updatedItems = foodItems.map(item =>
      item._id === id ? { ...item, quantity: Math.max(newQuantity, 0) } : item
    );
    console.log(foodItems.map(item => item._id));
    setFoodItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleDelete = (id) => {
    const updatedItems = foodItems.filter(item => item._id !== id);
    setFoodItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const amount = foodItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    navigate('/payment-gateway', { state: { amount } });
  };

  return (
    <main className="container mx-auto p-6">
      

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {foodItems.length > 0 ? (
            foodItems.map(item => (
              <CartItem key={item._id}
              item={item}
              onQuantityChange={updateQuantity}
              onDelete={handleDelete}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Price Details</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">₹ {amount.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePayment}
            className="bg-red-500 text-white px-6 py-2 rounded-md w-full mt-4 hover:bg-red-600"
            disabled={foodItems.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;