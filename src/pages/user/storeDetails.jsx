import React from "react";
import { useLoaderData } from "react-router-dom";
import FoodItemCard from "../../components/foodItemCard.jsx";


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

export function StoreDetails() {
  const { foodItems = [], store } = useLoaderData(); 

  if (!store) {
    return <p>Store details not available.</p>;
  }

  return (
    
    <main>
      <div key={store._id}>
        <h2 className="md:container md:mx-auto font-bold text-xl p-6">{store.storeName}</h2>
        <div className="grid grid-cols-3 gap-4">
          {foodItems.length > 0 ? (
            foodItems.map((foodItem) => (
              <FoodItemCard key={foodItem._id} foodItem={foodItem} />
            ))
          ) : (
            <p>No food items available for this store.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default StoreDetails;
