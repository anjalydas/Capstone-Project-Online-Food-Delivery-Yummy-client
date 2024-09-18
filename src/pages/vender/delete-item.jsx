import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteFoodItem() {
  const { foodId } = useParams();
  const navigate = useNavigate();

  function handleDelete() {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/item/${foodId}`)
      .then((response) => {
        console.log(response);
        navigate("/food-items"); // Redirect to the list of food items after deletion
      })
      .catch((error) => console.log(error));
  }

  return (
    <main>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="md:container md:mx-auto font-bold text-xl p-6">Delete Food Item</h2>
        <p className="text-lg mb-4">Are you sure you want to delete this food item?</p>
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Food Item
        </button>
      </div>
    </main>
  );
}

export default DeleteFoodItem;
