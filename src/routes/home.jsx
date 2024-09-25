import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
export async function loader (params) {
  try{
   const response = await fetch (`${import.meta.env.VITE_API_BASE_URL}/item`)
   const storeResponse = await fetch (`${import.meta.env.VITE_API_BASE_URL}/store`)
   const {foodItems} = await response.json()
   const {stores} = await storeResponse.json()
   console.log(foodItems)

   return { foodItems, stores };
  }
  catch (error) {
   console.error("API Fetch Error:", error);
   throw error;
 }     
 }
function Home(props){
  const {foodItems, stores} = useLoaderData();
  const limitedFoodItems = foodItems.slice(0, 10);
    return(
        <main>
    <section className="md:container md:mx-auto ">
    <img src="/assets/images/banner.jpeg" alt="banner" className="w-full h-auto" />
<h2 className="md:container md:mx-auto font-bold text-xl p-6 ">What's on your mind?</h2>

     

     <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
     {
     limitedFoodItems.map((foodItem)=>{
                return(
                
    <div key={foodItem._id} className="bg-white p-4 rounded-lg shadow">
     <Link to={`/item/${foodItem._id}`}> <img className="w-full h-48 object-cover" src={foodItem.image} alt="foodImage"  /></Link>
                     <div className="w-1/2 pl-6">
                     <h2 className="text-xl font-bold mb-2">{foodItem.dishName}</h2>
                  
                   <p className="text-pink-700 text-lg font-semibold mt-2 whitespace-nowrap">
          ₹ {foodItem.price.toFixed(2)}
        </p>
                     </div>
     </div>
     )
     })}</div> <div className="text-center my-6">
     <Link to="/item">
       <button className="px-4 py-2 bg-pink-600 text-white font-bold rounded-lg">
         View All
       </button>
     </Link>
   </div>
    </section>
    <section className="md:container md:mx-auto ">
     <h2 className="md:container md:mx-auto font-bold text-xl p-6 ">STORES</h2>
     <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
     {
     stores.map(store=>{
                return(
                
    <div key={store._id} className="bg-white p-4 rounded-lg shadow">
     <Link to={`/item?storeId=${store._id}`}> <img className="w-full h-48 object-cover" src={store.image} alt="foodImage"  /></Link>
                     <div className="w-1/2 pl-6">
                     <h2 className="text-xl font-bold mb-2">{store.storeName}</h2>
                  
                     </div>
     </div>
     )
     })}</div>
     <div className="text-center my-6">
          <Link to="/store">
            <button className="px-4 py-2 bg-pink-600 text-white font-bold rounded-lg">
              View All
            </button>
          </Link>
        </div>
    </section>
    <section>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to YUMMY!</h1>
      <p className="mb-6">
        Discover the best food from your favorite restaurants. Browse through our menu and enjoy delicious meals delivered to your doorsteps.
      </p>
      
      <div className="mb-6">
        
        <img
          src="https://bimabdcompany.s3-ap-southeast-1.amazonaws.com/media/public/wink/images/XpbSehOk4nbehEdBtngzMl6tEjKSeaHwEhQftCSn.png"
          alt="Delicious food"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
    </section>
  </main>
  )}
export default Home
