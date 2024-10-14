import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

// Loader function to fetch user data
export async function loader() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Log the entire response for debugging

    return { user: data.user || [] }; // Ensure you access the correct property
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; // or return a default value like { users: [] }
  }
}

// User component to manage and display users
export function User() {
  const { user } = useLoaderData(); // Load initial user data
  const [users, setUsers] = useState(user); // Initialize local state for users
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ _id: "", name: "", email: "", mobile: "" });
  const navigate = useNavigate();

  const handleUpdate = (user) => {
    console.log("Selected user for update:", user); // Log user object
    setFormData({ 
      userId: user._id, 
      name: user.name, 
      email: user.email, 
      mobile: user.mobile, 
    });
    setShowModal(true);
  };
  
  // Handle delete user action
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId)); // Update the users state
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${formData.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: formData.userId, // Send the user ID as "user"
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
        }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) => prevUsers.map((u) => (u._id === updatedUser.user._id ? updatedUser.user : u))); // Update users state with the new user data
        setShowModal(false);
      } else {
        const errorData = await response.json(); // Log the error details from the server
        console.error("Failed to update user:", errorData);
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };
  
  return (
    <main>
      <section className="md:container md:mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Manage Users</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? ( // Use the local state here
              <tr>
                <td colSpan="6" className="text-center">No users found.</td>
              </tr>
            ) : (
              users.map((user) => ( // Use the local state here
                <tr key={user._id}>
                  <td className="px-4 py-2">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={user.profilePic}
                      alt={user.name}
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.mobile}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Update User Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Update User</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label>Mobile:</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg"
                  >
                    Update User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default User;
