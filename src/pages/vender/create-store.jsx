import React, { useRef, useState } from "react";
import axios from "axios";

function AddStore() {
  // Create refs for form fields
  const storeNameRef = useRef(null);
  const addressRef = useRef(null);
  const contactRef = useRef(null);
  const imageRef = useRef(null);
  const ratingRef = useRef(null);
  const descriptionRef = useRef(null);
  const dishRef = useRef(null);

  // State to store success or error message
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const storeName = storeNameRef.current.value;
    const address = addressRef.current.value;
    const contactNumber = contactRef.current.value;
    const image = imageRef.current.value;
    const rating = ratingRef.current.value;
    const description = descriptionRef.current.value;
    const dish = dishRef.current.value.split(",").map((item) => item.trim()); // Convert dish string to array

    const data = {
      storeName,
      address,
      contactNumber,
      image,
      rating: parseFloat(rating), // Convert rating to number
      description,
      dish,
    };

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/store`, data)
      .then((response) => {
        console.log(response);
        setMessage("Store added successfully!");
        // Optionally, clear the form after success
        storeNameRef.current.value = "";
        addressRef.current.value = "";
        contactRef.current.value = "";
        imageRef.current.value = "";
        ratingRef.current.value = "";
        descriptionRef.current.value = "";
        dishRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error adding store. Please try again.");
      });
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
        <h2 className="md:container md:mx-auto font-bold text-xl p-6">Add New Store</h2>

        {/* Display success or error message */}
        {message && (
          <div className={`p-4 rounded-md ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <div>
          <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
            Store Name
          </label>
          <input
            ref={storeNameRef}
            type="text"
            id="storeName"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            ref={addressRef}
            type="text"
            id="address"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            ref={contactRef}
            type="text"
            id="contactNumber"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            ref={imageRef}
            type="text"
            id="image"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            ref={ratingRef}
            type="number"
            step="0.1"
            id="rating"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            ref={descriptionRef}
            type="text"
            id="description"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="dish" className="block text-sm font-medium text-gray-700">
            Dishes (comma separated)
          </label>
          <input
            ref={dishRef}
            type="text"
            id="dish"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Store
        </button>
      </form>
    </main>
  );
}

export default AddStore;
