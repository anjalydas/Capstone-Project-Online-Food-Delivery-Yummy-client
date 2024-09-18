import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeLoggedinState } from "../../features/login/loginSlice.js";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, { withCredentials: true })
      .then(response => {
        dispatch(changeLoggedinState(false));
        navigate('/login');
      })
      .catch(error => {
        console.log("Cannot log out");
      });
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">Are you sure you want to log out?</h2>

          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log Out
            </button>
            <Link to="/home"
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
