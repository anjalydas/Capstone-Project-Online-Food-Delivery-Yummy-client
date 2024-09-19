import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function FoodItemList() {
  const { storeId } = useParams(); // Get the store ID from the URL
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all food items for the store
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/item/store/${storeId}`) // Adjust your API endpoint
      .then((response) => {
        setFoodItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
        setLoading(false);
      });
  }, [storeId]);

  // Delete a food item
  function handleDelete(foodItemId) {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/item/${foodItemId}`)
      .then((response) => {
        console.log("Food item deleted:", response.data);
        // Remove the deleted item from the UI
        setFoodItems(foodItems.filter(item => item._id !== foodId));
      })
      .catch((error) => {
        console.error("Error deleting food item:", error);
      });
  }

  if (loading) {
    return <p>Loading food items...</p>;
  }

  return (
    <main>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Food Items under Store</h1>
        <ul className="space-y-4">
          {foodItems.map((item) => (
            <li key={item._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
              <div>
                <h3 className="text-lg font-semibold">{item.dishName}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <Link
                  to={`/update-fooditem/${item._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default FoodItemList;
