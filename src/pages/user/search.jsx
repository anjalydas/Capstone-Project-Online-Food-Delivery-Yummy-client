import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      setError('');
      setSearchResults([]);

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/item/search`, {
          params: { query: searchQuery.trim() },
        });

        if (response.data && response.data.foodItems && response.data.foodItems.length > 0) {
          setSearchResults(response.data.foodItems);
        } else {
          setError('No items found');
        }
      } catch (error) {
        setError('Error fetching search results. Please try again.');
        console.error('Error fetching search results:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid search term.');
    }
  };

  const handleAddToCart = (item) => { 
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('You need to log in to add items to the cart.');
      navigate('/login'); // Redirect to the login page
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      // If the item already exists, update its quantity
      existingItem.quantity += 1;
    } else {
      // Otherwise, add the item to the cart with quantity 1
      cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${item.dishName} has been added to your cart.`);
  };
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex items-center mb-4 w-full max-w-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search food items"
        />
        <button
          onClick={handleSearch}
          className="bg-pink-600 text-white px-4 py-2 rounded-r-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Display error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="w-full max-w-lg">
          <ul>
            {searchResults.map((item) => (
              <li key={item._id} className="mb-4 p-4 border border-gray-200 rounded-md">
                <img
    src={item.image} 
    alt={item.dishName}
    className="w-24 h-24 object-cover rounded-md mr-4" 
  />
  <div>
                <h3 className="text-xl font-semibold">{item.dishName}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="font-bold">Price: ${item.price}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-4"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
