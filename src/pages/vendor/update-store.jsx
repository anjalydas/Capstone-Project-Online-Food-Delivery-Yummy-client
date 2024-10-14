import React, { useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const { storeId } = params;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/item/${item._id}?storeName=${storeId}`);
    const foodItemsData = await response.json();

    const storeResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/store/${storeId}`);
    const storeData = await storeResponse.json();

    if (!foodItemsData || !foodItemsData.foodItems || !storeData) {
      throw new Error("Invalid data from API");
    }
    return {
      foodItems: foodItemsData.foodItems,
      store: storeData,
    };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { foodItems: [], store: null };
  }
}

function UpdateStore(props){
  const { stores} = useLoaderData();
  const storeNameRef = useRef(null)
  const imageRef = useRef(null)
  const addressRef = useRef(null)
  const contactRef = useRef(null)
  const descriptionRef = useRef(null)
  const dishRef = useRef(null)
  function handleSubmit(event){
    event.preventDefault()
    const storeName = storeNameRef.current.value
    const image = imageRef.current.value
    const address = addressRef.current.value
    const contactNumber = contactRef.current.value
    const dish = dishRef.current.value
  
  const data = {
   storeName : storeName,
   image : image,
   address :address,
   contactNumber: contactNumber,
   dish: dish
  }
  axios.patch(`${import.meta.env.VITE_API_BASE_URL}/store/${params.storeId}`, data)
  .then(responce => console.log(responce))
  .catch(error => console.log(error))
}
    return(
      <main> 
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="md:container md:mx-auto font-bold text-xl p-6 "> Update Your STORE  </h2>
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
        <label htmlFor="dish" className="block text-sm font-medium text-gray-700">
          Dish
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
        Submit
      </button>
    </form>
    </main>
  )}
export default UpdateStore