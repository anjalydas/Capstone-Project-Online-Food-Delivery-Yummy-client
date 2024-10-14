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
  const handleLogout = () => {
    // Clear user session or token (if stored in localStorage, cookies, etc.)
    localStorage.removeItem("token"); // Assuming token is stored in localStorage
    dispatch(changeLoggedinState(false)); // Update Redux state
    navigate("/login"); // Redirect to login page
  };
  useEffect(() => {
    if (user ) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/user/${user._id}`,
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
              <img src="/assets/images/logo.png" alt="Logo" className="h-20 w-20" />
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
            
            <div className="flex items-center space-x-1 cursor-pointer">
              {userLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center space-x-1">
                  <span className="material-symbols-outlined">account_circle</span>
                  <span>Logout</span>
                </button>
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

         
              <DarkMode />
           
          </div>
        </section>

        {/* Food Items Section */}
        <section className="flex items-center justify-between p-4 bg-gray-50 shadow-sm">
          {foodItems.map((item) => (
            <div key={item._id}>
              <Link to={`/item/${item._id}`}>
                <img src={item.image} alt={item.dishName} className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-cover rounded-full mb-2" />
                <span className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold">{item.dishName}</span>
              </Link>
            </div>
          ))}
        </section>
      </header>
      <Outlet />
      {/* Footer */}
      <footer className="bg-gray-100 p-8">
      <div className="container mx-auto grid grid-cols-4 md:grid-cols-4 gap-8">
        
        <div className="col-span-1">
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/privacy-policy" className="hover:underline">Privacy & Policy</a></li>
            <li><a href="/terms-conditions" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/cancellation-refund-policy" className="hover:underline">Cancellation & Refund Policy</a></li>
            <li><a href="/create-store" className="hover:underline">Vendor Registration</a></li>
            <li><a href="/customer-care" className="hover:underline">Customer Care</a></li>
            
          </ul>
        </div>

        
        <div className="col-span-1">
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <p>Yummy.Com, 537 D, Ward 14, Elliyarackal Junction Konni, Pathanamthitta Kerala-689691</p>
          <p className="mt-2"><i className="fas fa-phone"></i> +918200000077</p>
          <p className="mt-2"><i className="fas fa-envelope"></i> customercare@yummy.com</p>
        </div>

       
        <div className="col-span-1">
          <h4 className="font-bold text-lg mb-4">Find Our App On Mobile</h4>
          <div className="flex space-x-4">
            <img src="https://d2yjtfae5jrf96.cloudfront.net/media/www.stickersstickers.com/source/apple-app-store-qr-code-sticker.png" alt="App Store QR Code" className="h-24 w-24" />
            <img src="https://d2yjtfae5jrf96.cloudfront.net/media/www.stickersstickers.com/source/google-play-store-qr-code-sticker.png" alt="Google Play QR Code" className="h-24 w-24" />
          </div>
          
        </div>

       
        <div className="col-span-1">
          <h4 className="font-bold text-lg mb-4">Payment Methods</h4>
          <div className="flex space-x-4">
            <img src="https://qdelo.com/assets/images/cards/visa.png" alt="Visa" className="h-10" />
            <img src="https://qdelo.com/assets/images/cards/master.png" alt="Mastercard" className="h-10" />
            <img src="https://qdelo.com/assets/images/cards/mobile-money.png" alt="Other Payment" className="h-10" />
          </div>
          <h4 className="font-bold text-lg mt-8">Keep In Touch</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#"><img src="https://fortconcho.com/wp-content/uploads/2018/01/facebook-logo-png.png" alt="fb logo" className="h-10 w-15"/></a>
            <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M4Y-6t5RJuSWFY1ODSF_oJFHcwOLSqhZJ0OKfof2ik7-raUcw2-MSxWZJt-10XrTDfY&usqp=CAU" alt="instalogo" className="h-10 w-15"/></a>
            <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qEnYL4qHVxUt4DymptKAWE7W-RcYBxqhuw&s" alt="whatsapplogo" className="h-10 w-15"/></a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Root;
