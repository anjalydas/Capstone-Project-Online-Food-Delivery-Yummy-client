import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItemsToCart: (state, action) => {
      const cartItem = {
        ...action.payload,
        quantity: 1
      };
      state.items.push(cartItem);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 0) // Ensure quantity does not go below 0
          };
        }
        return item;
      });
    }
  }
});

// Action creators are generated for each case reducer function
export const { addItemsToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
