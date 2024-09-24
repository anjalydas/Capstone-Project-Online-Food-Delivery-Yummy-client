import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

// Loader to fetch user data
export async function loader() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`);
    const { users } = await response.json();
    return { users };
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

export function User() {
  const { users: initialUsers } = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for update
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const navigate = useNavigate();

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Open modal to update user
  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, mobile: user.mobile });
    setShowModal(true);
  };

  // Function to handle updating a user
  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${selectedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the user");
      }

      const updatedUser = await response.json();

      // Update the users list in the state
      const updatedUsers = users.map((user) =>
        user._id === selectedUser._id ? updatedUser : user
      );
      setUsers(updatedUsers);

      setShowModal(false); // Close the modal
      alert("User updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      alert("There was an error updating the user.");
    }
  };

  // Function to handle deleting a user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }

      // Filter out the deleted user from the UI
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("There was an error deleting the user.");
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
            {users.map((user) => (
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
                  {/* Update button */}
                  <button
                    onClick={() => handleUpdate(user)}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg mr-2"
                  >
                    Update
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update User Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Update User</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-bold" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg"
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