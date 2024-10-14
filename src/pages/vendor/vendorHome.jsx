import React from 'react';
import { Link } from 'react-router-dom';


function VendorHome() {
    return (
        <>
        
        <main>
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-center text-gray-800">Welcome Vendor!</h1>
                <p className="mt-4 text-xl text-gray-700">
                    Manage your store, food items, and orders here.
                </p>
                <div className="mt-6 space-x-4">
                   <Link to={'/vendor/add-foodItem'}> <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-green-700">
                        Add Food 
                    </button></Link>
                  <Link to={'/vendor/delete-foodItem'} > <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-green-700">
                        Delete Food
                    </button></Link>
                  
                    <Link to={'/vendor/orders'} > <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-green-700">
                        Orders
                    </button></Link>
                </div>
            </section>
        </main>
        
        </>
    );
}

export default VendorHome;
