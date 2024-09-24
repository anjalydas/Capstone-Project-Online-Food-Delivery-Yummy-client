import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export function FoodItemCard({ foodItems }) {
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    const storeMap = {
        "66d76d1f03143113712c766e": "Malabar Restaurant",
        "anotherStoreId": "Another Store Name",
    };

    const getStoreName = (storeId) => storeMap[storeId] || "Store Not Available";

    useEffect(() => {
        console.log('Food Items:', foodItems);
    }, [foodItems]);
    const [quantities, setQuantities] = useState({});
    const handleAdd = (itemId) => {
        setQuantities(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };
    
    const handleSubtract = (itemId) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0
        }));
    };

   const handleAddToCart = (item) => {
    const quantity = quantities[item._id] || 0;

    if (quantity > 0) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ ...item, quantity });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        navigate('/mycart');
    } else {
        alert("Please select a quantity before adding to the cart.");
    }
};
    

    return (
        <>
            {Array.isArray(foodItems) && foodItems.length > 0 ? (
                foodItems.map(item => (
                    <div key={item._id} className="md:container md:mx-auto max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg flex padding-6">
                        <Link to={`/item/${item._id}`}>
                            <img className="w-full h-48 object-cover" src={item.image} alt={item.dishName} />
                        </Link>
                        <div className="w-1/2 pl-6">
                            <h2 className="text-2xl font-bold mb-2">{item.dishName}</h2>
                            <p className="text-gray-600 mb-4">{getStoreName(item.storeId)}</p> {/* Ensure storeId is being used */}
                            <p className="text-red-500 text-3xl font-semibold mb-2">₹ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className="text-gray-600 mr-4">Quantity :</span>
                            <div className="flex items-center">
                                <button
                                    className="text-gray-600 border rounded-l px-3 py-1"
                                    onClick={handleSubtract}
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-t border-b">{quantity}</span>
                                <button
                                    className="text-gray-600 border rounded-r px-3 py-1"
                                    onClick={handleAdd}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className="bg-red-500 text-white px-6 py-2 rounded-md mb-4"
                            onClick={() => handleAddToCart(item)}
                        >
                            ADD TO CART
                        </button>
                    </div>
                ))
            ) : (
                <p>No food items available</p>
            )}
        </>
    );
}

export default FoodItemCard