import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import StoreCard from "../../components/storeCard.jsx";

export async function loader() {
  try {
    // Fetch all stores
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/store`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const storeData = await response.json();

    if (!storeData || !storeData.stores) {
      throw new Error("Invalid data from API");
    }

    return { stores: storeData.stores };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { stores: [] };  
  }
}

export function Store() {
  const { stores } = useLoaderData();  
  const navigate = useNavigate();

  const handleStoreClick = (storeName) => {
    navigate(`/item?storeName=${storeName}`);
  };
  

  return (
    <main>
      <div>
      <h2 className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 md:container md:mx-auto font-bold text-xl p-6">
  STORES
</h2>
 {stores.length > 0 ? (
            stores.map((store) => (
              <StoreCard
                key={store._id}
                store={store}
                onClick={() => handleStoreClick(store._id)}
              />
            ))
          ) : (
            <p>No stores available</p>
          )}
      </div>
    </main>
  );
}

export default Store;