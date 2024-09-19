import React from 'react';
import { Link } from 'react-router-dom';

function AdminHome() {
    return (
        <main>
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-center text-gray-800">Welcome Admin!</h1>
                <p className="mt-4 text-xl text-gray-700">
                    Manage users, orders, and more from your dashboard.
                </p>
                <div className="mt-6 space-x-4">
                <Link to={'/user'}  > <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-indigo-700">
                        Manage Users
                    </button></Link> 
                 <Link to={'/update-store'}>  <button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-indigo-700">
                        Edit vender
                    </button></Link> 
                  <Link to={'/create-store'} ><button className="px-4 py-2 text-white bg-pink-600 rounded hover:bg-indigo-700">
                        Add vender
                    </button></Link> 
                </div>
            </section>
        </main>
    );
}

export default AdminHome;
