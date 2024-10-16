import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

export async function loader(params) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/item`);
    const foodItems = await response.json();

    const storeResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/store`);
    const stores = await storeResponse.json();

    console.log(foodItems, stores); 
    return {
      foodItems: foodItems.foodItems || [], 
      stores: stores.stores || [], 
    };
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

function FoodItem() {
  const { foodItems = [], stores = [] } = useLoaderData();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const getStoreName = (storeId) => {
    const store = stores.find((store) => store._id === storeId);
    return store ? store.storeName : 'Store Not Available';
  };

  const handleAddToCart = (item) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const token = localStorage.getItem('token'); 
    
    // Check if the user is logged in
    if (!token) {
      navigate('/login');
      return; // Exit early if user is not logged in
    }

    // Proceed to add item to cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity; // Update quantity if item exists
    } else {
      cartItems.push({ ...item, quantity }); // Add new item
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/mycart'); // Redirect to cart after adding item
  };

  return (
    <main>
      <section className="md:container md:mx-auto">
        <h2 className="md:container md:mx-auto font-bold text-xl p-6">Delish Delights</h2>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodItems.map((foodItem) => (
            <div key={foodItem._id} className="bg-white p-4 rounded-lg shadow">
              <Link to={`/item/${foodItem._id}`}>
                <img className="w-full h-48 object-cover" src={foodItem.image} alt={foodItem.dishName} />
              </Link>
              <div className="w-1/2 pl-6">
                <h2 className="text-xl font-bold mb-2">{foodItem.dishName}</h2>
                <p className="text-lg text-gray-600 mb-4">{getStoreName(foodItem.storeName)}</p>
                <p className="text-pink-700 text-lg font-semibold mt-2 whitespace-nowrap">
                  ₹ {foodItem.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(foodItem)}
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-pink-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default FoodItem;
