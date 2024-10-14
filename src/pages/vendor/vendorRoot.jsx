import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLoggedinState } from "../../features/login/loginSlice";

function VendorRoot() {
  const userLoggedIn = useSelector((state) => state.login.userLoggedIn);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    localStorage.getItem("token");
    dispatch(changeLoggedinState(true));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(changeLoggedinState(false));
    navigate("/vendor/vendor-login");
  };

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/user/${user._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(changeLoggedinState(true));
        })
        .catch((error) => {
          dispatch(changeLoggedinState(false));
        });
    }
  }, [dispatch, user]);

  return (
    <>
      <header className="bg-pink-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-symbols-outlined text-4xl">auto_stories</span>
            <Link to="/vendor/vendor-home">
              <h1 className="ml-2 text-3xl font-bold">Vendor</h1>
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/vendor/vendor-home" className="text-lg hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vendor/vendor-signup" className="text-lg hover:text-gray-300">
                  SignUp
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-1 cursor-pointer">
                  {userLoggedIn ? (
                    <Link to="/vendor/vendor-logout">
                    <button onClick={handleLogout} className="flex items-center space-x-1">
                      <span className="material-symbols-outlined">account_circle</span>
                      <span>Logout</span>
                    </button></Link>
                  ) : (
                    <Link to="/vendor/vendor-login">
                      <button onClick={handleLogin} className="flex items-center space-x-1">
                      <div className="flex items-center space-x-1">
                        <span className="material-symbols-outlined">account_circle</span>
                        <span>Login</span>
                      </div></button>
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto my-8">
        <Outlet />
      </main>

      <footer className="bg-pink-800 text-white py-4 mt-8 text-center">
        <p>&copy; 2024 Admin Panel</p>
      </footer>
    </>
  );
}

export default VendorRoot;
