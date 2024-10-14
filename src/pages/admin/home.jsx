import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

// Loader to fetch store data
export async function loader() {
  try {
    const storeResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/store`);
    const { stores } = await storeResponse.json();
    return { stores };
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

export function AdminHome() {
  const { stores: initialStores } = useLoaderData();
  const [stores, setStores] = useState(initialStores);

  // Function to handle store deletion
  const handleDelete = async (storeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this store?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/store/${storeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the store");
      }

      // Filter out the deleted store from the UI
      const updatedStores = stores.filter((store) => store._id !== storeId);
      setStores(updatedStores);

      alert("Store deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("There was an error deleting the store.");
    }
  };

  return (
    <main>
      <section className="md:container md:mx-auto p-6">
       
        {/* Section for Store Management */}
        <h2 className="text-xl font-bold mb-4">Manage Stores</h2>
        <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stores.map((store) => {
            return (
              <div key={store._id} className="bg-white p-4 rounded-lg shadow">
                <Link to={`/store/edit/${store._id}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={store.image}
                    alt="StoreImage"
                  />
                </Link>
                <div className="pl-6">
                  <h2 className="text-xl font-bold mb-2">{store.storeName}</h2>
                  <p className="text-gray-700">{store.description}</p>
                </div>
                {/* Delete Button */}
                <div className="text-right mt-2">
                  <button
                    onClick={() => handleDelete(store._id)}
                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg"
                  >
                    Delete Store
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center my-6">
          <Link to={"/user/create-store"}>
            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg">
              Add New Store
            </button>
          </Link>
        </div>

        {/* Section for User Management */}
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <div className="text-center my-6">
          <Link to={"/user/users"}>
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">
              Manage Users
            </button>
          </Link>
        </div>

        {/* Welcome Message and Info Section */}
        <section>
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Panel!</h1>
            <p className="mb-6">
              From here, you can manage stores, users, and monitor the system. Use the tools
              provided to keep the platform running smoothly.
            </p>
            
          </div>
        </section>
      </section>
    </main>
  );
}

export default AdminHome;
