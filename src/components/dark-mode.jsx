import React, { useState, useEffect } from "react";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-600 dark:text-white"
    >
      <span className="material-symbols-outlined">
        {darkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}

export default DarkMode;