import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VendorSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [generalError, setGeneralError] = useState('');

    function handleSignUp(event) {
        event.preventDefault();

        setGeneralError('');
        setMessage('');

        const data = {
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            role: role,
            userId: userId
        };

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/sign-up`, data, { withCredentials: true })
            .then(response => {
                setMessage("Signup successful!"); 
                setName('');  
                setEmail('');
                setMobile('');
                setPassword('');
                setRole('');
                setUserId('');
                Navigate('/vendor-login')
            }
        )
            .catch(error => {
                const errorMessage = error.response?.data?.message;

                if (errorMessage) {
                    setGeneralError(errorMessage);
                } else {
                    setGeneralError('Signup failed. Please try again.');
                }
            });
    }

    return (
        <main >
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-2xl font-bold text-center text-gray-800" >
                    Create Your Account
                </h2>
                <form onSubmit={handleSignUp} className="mt-8 space-y-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name:</label>
                    <input onChange={(event) => setName(event.target.value)} id="name"
                        name="name"
                        type="text"
                        value={name}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address:</label>
                    <input onChange={(event) => setEmail(event.target.value)} id="email"
                        name="email"
                        type="email"
                        value={email}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile:</label>
                    <input onChange={(event) => setMobile(event.target.value)} id="mobile"
                        name="mobile"
                        type="number"
                        value={mobile}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User Name:</label>
                    <input onChange={(event) => setUserId(event.target.value)} id="userId"
                        name="userId"
                        type="text"
                        value={userId}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input onChange={(event) => setPassword(event.target.value)} id="password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            onChange={(event) => setRole(event.target.value)}
                            value={role}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Role</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                    <button className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Signup</button>
                </form>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
                {generalError && <p className="mt-4 text-center text-red-600">{generalError}</p>}
                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?
                  <Link to={'/vendor/vendor-login'} className="font-medium text-indigo-600 hover:text-indigo-500"> Sign in</Link> 
                </p>
            </section>
        </main>
    );
}

export default VendorSignUp
