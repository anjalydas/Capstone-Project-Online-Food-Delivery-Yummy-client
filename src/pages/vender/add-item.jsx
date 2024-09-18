import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

function AddFoodItem() {
  const dishNameRef = useRef(null);
  const imageRef = useRef(null);
  const storeNameRef = useRef(null);
  const priceRef = useRef(null);
  const ratingRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores to populate the dropdown
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/store`)
      .then(response => setStores(response.data.stores))
      .catch(error => console.error(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      dishName: dishNameRef.current.value,
      image: imageRef.current.value,
      storeName: storeNameRef.current.value,
      price: parseFloat(priceRef.current.value),
      rating: parseFloat(ratingRef.current.value),
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/item`, data)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
        <h2 className="text-xl font-bold p-6">Add New Food Item</h2>

        <div>
          <label htmlFor="dishName" className="block text-sm font-medium text-gray-700">Dish Name</label>
          <input ref={dishNameRef} type="text" id="dishName" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input ref={imageRef} type="text" id="image" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store</label>
          <select ref={storeNameRef} id="storeName" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {stores.map(store => (
              <option key={store._id} value={store._id}>{store.storeName}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input ref={priceRef} type="number" id="price" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <input ref={ratingRef} type="number" step="0.1" id="rating" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input ref={descriptionRef} type="text" id="description" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select ref={categoryRef} id="category" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Add Food Item</button>
      </form>
    </main>
  );
}

export default AddFoodItem;
