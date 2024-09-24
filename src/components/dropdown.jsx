import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    switch (value) {
      case 'dishes':
        navigate('/item');
        break;
      case 'stores':
        navigate('/store');
        break;
        case 'vendor':
        navigate('/vendor-login');
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative">
      <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
       
      </label>
      <select
        id="dropdown"
        onChange={handleChange}
        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="Quick Links">Quick Links</option>
        <option value="dishes">Dishes</option>
        <option value="stores">Stores</option>
        <option value="vendor">Vendor</option>
      </select>
    </div>
  );
}

export default Dropdown;
