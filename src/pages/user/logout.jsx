import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeLoggedinState } from "../../features/login/loginSlice.js";

function Logout() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
      try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {
              withCredentials: true  // Ensure cookies are included
          });
  
          if (res.data.success) {
              localStorage.removeItem('token');  // Clear token from localStorage
              dispatch(changeLoggedinState(false));  // Update state
              nav('/login');  // Redirect to login
          } else {
              console.error(res.data.message);  // Handle failure
          }
      } catch (err) {
          console.error('Logout error:', err);
      }
  };
  
  

    return (
        <main>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Are you sure you want to log out?</h2>

                    <div className="space-y-4">
                        {message && <p className="text-green-600">{message}</p>}  {/* Success Message */}
                        {error && <p className="text-red-600">{error}</p>}  {/* Error Message */}

                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Log Out
                        </button>
                        <Link
                            to="/home"
                            className="block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Logout;
