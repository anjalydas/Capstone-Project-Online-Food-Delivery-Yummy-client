import React from "react";
import { Link, Outlet } from "react-router-dom";

function UserRoot(props) {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Admin</title>

      <header className="bg-pink-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-symbols-outlined text-4xl">auto_stories</span>
            <h1 className="ml-2 text-3xl font-bold">ADMIN</h1>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-lg hover:text-gray-300">
                  Home
                </Link>
              </li>
             
              <li>
                <Link to="/SignUp" className="text-lg hover:text-gray-300">
                  SignUp
                </Link>
              </li>
              <li>
                <Link to="/Login" className="text-lg hover:text-gray-300">
                  Login
                </Link>
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
