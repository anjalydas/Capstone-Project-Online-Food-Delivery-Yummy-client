import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteFoodItem() {
  const [foodId, setFoodId] = useState(""); // State for foodId
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (foodId) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/item/${foodId}`)
        .then((response) => {
          setFoodItem(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching food item details. Please try again.");
          setLoading(false);
        });
    }
  }, [foodId]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/item/${foodId}`);
      navigate("/item"); // Redirect to the list of food items after deletion
    } catch (err) {
      setError("Error deleting food item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setConfirm(true);
  };

  const handleCancel = () => {
    setConfirm(false);
  };

  return (
    <main>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="font-bold text-xl p-6">Delete Food Item</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (foodId) {
              setConfirm(false);
              setLoading(true);
              axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/item/${foodId}`)
                .then((response) => {
                  setFoodItem(response.data);
                  setLoading(false);
                })
                .catch((err) => {
                  setError("Error fetching food item details. Please try again.");
                  setLoading(false);
                });
            }
          }}
        >
          <div className="mb-4">
            <label htmlFor="foodId" className="block text-lg font-medium text-gray-700">
              Food Item ID:
            </label>
            <input
              type="text"
              id="foodId"
              value={foodId}
              onChange={(e) => setFoodId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Food Item
          </button>
        </form>
        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {foodItem && (
          <>
            <p className="text-lg mb-4 mt-6">
              Are you sure you want to delete the following food item?
            </p>
            <div className="mb-4">
              
              <p><strong>Food Item ID:</strong> {foodItem._id}</p>
              <p><strong>Vendor ID:</strong> {foodItem.storeId}</p>
              <p><strong>Name:</strong> {foodItem.dishName}</p>
              <p><strong>Vendor:</strong> {foodItem.storeName}</p>
              <p><strong>Price:</strong> ₹{foodItem.price}</p>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Food Item
            </button>
            {confirm && (
              <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300">
                <p className="text-lg mb-4">Please confirm deletion:</p>
                <button
                  onClick={handleDelete}
                  className="mr-4 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default DeleteFoodItem;
