import React, { useState, useEffect } from "react";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is saved in localStorage
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    // Apply dark mode class to the entire document
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle dark mode class on the entire document
    document.documentElement.classList.toggle("dark", !darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className=" dark:bg-gray-800 text-black dark:text-white p-2 rounded"
    >
      {darkMode ? (
        <span className="material-symbols-outlined">dark_mode</span>
      ) : (
        <span className="material-symbols-outlined">light_mode</span>
      )}
    </button>
  );
}

export default DarkMode;
