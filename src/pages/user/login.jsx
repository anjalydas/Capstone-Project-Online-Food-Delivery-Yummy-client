import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLoggedinState } from "../../features/login/loginSlice.js";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');  
    const [error, setError] = useState('');      
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogin(event) {
        event.preventDefault();
        setMessage('');
        setError('');
    
        const data = { email: email, password: password };
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, data, { withCredentials: true });
            console.log(response);  // Log the response for debugging
    
            if (response.data && response.data.success) {
                setMessage(response.data.message); // Use the message from the response
                dispatch(changeLoggedinState(true)); // Update login state
                navigate('/'); // Redirect to home page
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
                        onChange={(event) => setEmail(event.target.value)}
                        name="email"
                        type="email"
                        value={email}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    />
                    
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input 
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

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
                    <Link to={'/sign-up'} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;
