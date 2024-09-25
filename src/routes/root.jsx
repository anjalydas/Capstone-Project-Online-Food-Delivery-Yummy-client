import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DarkMode from "../components/dark-mode.jsx";
import Dropdown from "../components/dropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLoggedinState } from "../features/login/loginSlice.js";
import { useSearch } from "../context/searchContext.jsx";

function Root() {
  const [foodItems, setFoodItems] = useState([]);
  const { searchResults } = useSearch();
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchClick = () => {
    navigate("/search"); // Navigate to the /search page
  };

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/user/check-user/${user._id}`,
          { withCredentials: true }
        )
        .then((response) => {
          dispatch(changeLoggedinState(true)); // User is logged in
        })
        .catch((error) => {
          dispatch(changeLoggedinState(false)); // User is not logged in
        });
    }
  }, [dispatch, user]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/item`);
      if (response.data.success && Array.isArray(response.data.foodItems)) {
        setFoodItems(response.data.foodItems.slice(0, 10));
      } else {
        console.error("Response data is not in the expected format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <>
      <header>
        <section className="flex items-center justify-between p-4 bg-gray-50 shadow-sm">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link to={"/"}>
              <img src="public/assets/images/logo.jpg" alt="Logo" className="h-20 w-20" />
            </Link>
          </div>

          <div>
            <button
              onClick={handleSearchClick}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Search
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Dropdown />
            {/* Conditional rendering for Login/Logout */}
            <div className="flex items-center space-x-1 cursor-pointer">
              {userLoggedIn ? (
                <Link to={"/logout"}>
                  <div className="flex items-center space-x-1">
                    <span className="material-symbols-outlined">account_circle</span>
                    <span>Logout</span>
                  </div>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <div className="flex items-center space-x-1">
                    <span className="material-symbols-outlined">account_circle</span>
                    <span>Login</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link to={"/mycart"}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
            </div>

            <div>
              <DarkMode />
            </div>
          </div>
        </section>

        {/* Food Items Section */}
        <section className="flex items-center justify-between p-4 bg-gray-50 shadow-sm">
          {foodItems.map((item) => (
            <div key={item._id}>
              <Link to={`/item/${item._id}`}>
                <img src={item.image} alt={item.dishName} className="h-20 w-20" />
                <span className="text-gray-500">{item.dishName}</span>
              </Link>
            </div>
          ))}
        </section>
      </header>
      <Outlet />
      {/* Footer */}
      <footer className="bg-gray-100 p-8">
        {/* Footer content as per your existing code */}
      </footer>
    </>
  );
}

export default Root;
