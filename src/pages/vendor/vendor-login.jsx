import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedinState } from "../../features/login/loginSlice";

function VendorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/vendor/vendor-home'; // Default to home if no redirect path
    const { userLoggedIn, userId } = useSelector((state) => state.login);

    async function handleLogin(e) {
        e.preventDefault();
        setMessage('');
        setError('');
    
        const data = { email, password, role };
    
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, data, { withCredentials: true });
            console.log(res);
    
            if (res.data && res.data.success) {
                setMessage(res.data.message);
                dispatch(changeLoggedinState(true)); // Update login state
                
                const user = res.data.user;
                if (user && user._id) {
                    dispatch(changeLoggedinState({
                        userLoggedIn: true,
                        userId: user._id,
                    }));
                    localStorage.setItem('token', res.data.token); // Assuming token is stored in localStorage

                    console.log("Login state updated:", {
                        userLoggedIn: true,
                        userId: user._id,
                    });

                    // Navigate to home or redirect path after login
                    if (role === 'vendor') {
                        nav('/vendor/vendor-home');  // Navigate to vendor home page
                    } else {
                        setError("Login failed. Invalid role.");
                    }
                } else {
                    setError("Login failed. User data is missing.");
                }
            } else {
                setError("Login failed. Invalid response from the server.");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
            dispatch(changeLoggedinState(false));
        }
    }

    return (
        <main>
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Login to Your Account
                </h2>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        value={email}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    />
                    
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    />

                    {/* Role selection dropdown */}
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                    <select 
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                    </select>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {message && <p className="mt-4 text-center text-green-600">{message}</p>}  {/* Success Message */}
                {error && <p className="mt-4 text-center text-red-600">{error}</p>}  {/* Error Message */}

                <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to={'/vendor/vendor-signup'} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default VendorLogin;
