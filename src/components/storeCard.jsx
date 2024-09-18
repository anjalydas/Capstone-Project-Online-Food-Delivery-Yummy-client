import React from "react";
import { useNavigate } from "react-router-dom";


const StoreCard = ({ store, onClick }) => {
  const navigate = useNavigate();

  return (
    <div key={store._id} onClick={onClick} className="flex flex-col items-center cursor-pointer bg-white p-4 rounded-lg shadow">
  <h3 className="text-xl font-bold mb-4">{store.storeName}</h3>
  <div className="flex flex-row items-center space-x-4">
    <img src={store.image} alt={store.storeName} className="w-48 h-48 object-cover rounded" />
    <div className="flex flex-col justify-center">
      <p className="text-gray-600 mb-2">{store.address}</p>
      <span className="text-gray-800 font-semibold">{store.contactNumber}</span>
    </div>
  </div>
</div>

  );
};

export default StoreCard;
