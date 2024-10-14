import React from "react";

export function CartItem({ item, onQuantityChange, onDelete }) {
  const handleAdd = () => onQuantityChange(item._id, item.quantity + 1);
  const handleSubtract = () => onQuantityChange(item._id, item.quantity - 1);
  const handleDelete = () => onDelete(item._id);

  return (
    <div className="flex items-center border border-gray-200 p-4 rounded-md">
      <img src={item.image} alt={item.dishName} className="w-16 h-16 object-cover mr-4" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.dishName}</h3>
        <p className="text-gray-600">₹ {item.price.toFixed(2)}</p>
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <div className="flex items-center">
          <button
            className="text-gray-600 border rounded-l px-3 py-1"
            onClick={handleSubtract}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
          <button
            className="text-gray-600 border rounded-r px-3 py-1"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
        <button
          className="text-red-500 mt-2 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;