import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateFoodItem() {
  const { foodId } = useParams();
  const [foodItem, setFoodItem] = React.useState(null);

  const dishNameRef = useRef(null);
  const imageRef = useRef(null);
  const storeNameRef = useRef(null);
  const priceRef = useRef(null);
  const ratingRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    async function fetchFoodItem() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/item/${foodId}`);
        setFoodItem(response.data);
      } catch (error) {
        console.error("Error fetching food item:", error);
      }
    }
    fetchFoodItem();
  }, [foodId]);

  function handleSubmit(event) {
    event.preventDefault();

    const dishName = dishNameRef.current.value;
    const image = imageRef.current.value;
    const storeName = storeNameRef.current.value;
    const price = priceRef.current.value;
    const rating = ratingRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const data = {
      dishName,
      image,
      storeName,
      price: parseFloat(price),
      rating: parseFloat(rating),
      description,
      category,
    };

    axios
      .put(`${import.meta.env.VITE_API_BASE_URL}/item/${foodId}`, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  if (!foodItem) return <p>Loading...</p>;

  return (
    <main>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
        <h2 className="md:container md:mx-auto font-bold text-xl p-6">Update Food Item</h2>

        <div>
          <label htmlFor="dishName" className="block text-sm font-medium text-gray-700">Dish Name</label>
          <input
            ref={dishNameRef}
            type="text"
            id="dishName"
            defaultValue={foodItem.dishName}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            ref={imageRef}
            type="text"
            id="image"
            defaultValue={foodItem.image}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name (ID)</label>
          <input
            ref={storeNameRef}
            type="text"
            id="storeName"
            defaultValue={foodItem.storeName}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            ref={priceRef}
            type="number"
            id="price"
            defaultValue={foodItem.price}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            ref={ratingRef}
            type="number"
            step="0.1"
            id="rating"
            defaultValue={foodItem.rating}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            ref={descriptionRef}
            type="text"
            id="description"
            defaultValue={foodItem.description}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            ref={categoryRef}
            id="category"
            defaultValue={foodItem.category}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Food Item
        </button>
      </form>
    </main>
  );
}

export default UpdateFoodItem;
