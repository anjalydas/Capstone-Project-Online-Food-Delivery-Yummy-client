import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export async function loader({ params }) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/item/${params.foodItemId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json(); 
  return { foodItem: data.foodItem }; 
}

function FoodItemDetails() {
  const { foodItem } = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const navigate = useNavigate(); 
  useEffect(() => {
    console.log('FoodItem:', foodItem);
  }, [foodItem]);

  if (!foodItem || Object.keys(foodItem).length === 0) {
    return <p>Loading food item details...</p>;
  }

  
  const handleAddToCart = (item) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const token = localStorage.getItem('token'); 
    
    // Check if the user is logged in properly
    if (!token) {
      navigate('/login');}
      else{
        navigate('/mycart')
      return;
    }
  
    // If user is logged in, proceed with adding to cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
  
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity; // If item exists, update quantity
    } else {
      cartItems.push({ ...item, quantity }); // Add new item
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/mycart');
  };
  

  return foodItem ? (
    <main className="container mx-auto p-6">
      <section className="flex flex-col lg:flex-row gap-6">
       
        <div className="flex-shrink-0">
          <img
            src={foodItem.image}
            alt={foodItem.dishName}
            className="w-full h-48 object-cover rounded-lg shadow-lg "
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{foodItem.dishName}</h2>
            <p className="text-lg text-gray-600 mb-4">{foodItem.storeName ? foodItem.storeName.storeName : 'Store Not Available'}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-green-600 mr-2">
                ₹{foodItem.price}
              </span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <p className="text-gray-700">{foodItem.description}</p>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-lg mr-4">Quantity:</span>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-lg font-bold bg-gray-300 hover:bg-gray-400 rounded-l"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center text-lg border-t border-b border-gray-300 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-lg font-bold bg-gray-300 hover:bg-gray-400 rounded-r"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="shippingAddress" className="block text-lg mb-2">Shipping Address:</label>
              <input
                type="text"
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={() => handleAddToCart(foodItem)} 
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <p>Loading...</p>
  );
}

export default FoodItemDetails;
