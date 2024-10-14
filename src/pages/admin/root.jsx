import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoggedinState } from "../../features/login/loginSlice.js";

function UserRoot() {
  const { userLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(changeLoggedinState(false));
    localStorage.removeItem('token'); // Clear token
    navigate("/user"); // Redirect to login page
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Admin</title>

      <header className="bg-pink-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-symbols-outlined text-4xl">auto_stories</span>
            <Link to="/user/home-page" className="text-lg hover:text-gray-300"> <h1 className="ml-2 text-3xl font-bold">ADMIN</h1></Link>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/user/home-page" className="text-lg hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/user/signup" className="text-lg hover:text-gray-300">
                  SignUp
                </Link>
              </li>
              <li>
                {userLoggedIn ? (
                  <button onClick={handleLogout} className="text-lg hover:text-gray-300">
                    Logout
                  </button>
                ) : (
                  <Link to="/user" className="text-lg hover:text-gray-300">
                    Login
                  </Link>
                )}
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

export default UserRoot;
