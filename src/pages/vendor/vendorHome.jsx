import React from 'react';
import { Link } from 'react-router-dom';


function VendorHome() {
    return (
        <>
        <header className="bg-pink-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
                <nav>
                    <Link to="/vendor-home" className="px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
                    
                    <Link to="/logout" className="px-4 py-2 hover:bg-gray-700 rounded">Logout</Link>
                </nav>
            </div>
        </header> 
        <main>
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-center text-gray-800">Welcome Vendor!</h1>
                <p className="mt-4 text-xl text-gray-700">
                    Manage your store, food items, and orders here.
                </p>
                <div className="mt-6 space-x-4">
                   <Link to={'/add-foodItem'}> <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-green-700">
                        Add Food 
                    </button></Link>
                  <Link to={'/delete-foodItem'} > <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-green-700">
                        Delete Food
                    </button></Link>
                  <Link to={'/update-store'} > <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-green-700">
                        Store Settings
                    </button></Link>
                </div>
            </section>
        </main>
        <footer className="bg-pink-800 text-white py-4 mt-8 text-center">
        <p>&copy; 2024 Vendor Panel</p>
      </footer>
        </>
    );
}

export default VendorHome;
