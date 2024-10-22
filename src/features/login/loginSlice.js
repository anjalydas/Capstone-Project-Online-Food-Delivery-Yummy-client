import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLoggedIn: false,
    userId: null,
};

// Load login state from localStorage (if available)
const savedLoginState = JSON.parse(localStorage.getItem('loginState'));

export const loginSlice = createSlice({
    name: 'login',
    initialState: savedLoginState || initialState, // Use saved login state if available
    reducers: {
        changeLoggedinState: (state, action) => {
            console.log("Action Payload:", action.payload);
            state.userLoggedIn = action.payload.userLoggedIn;
            state.userId = action.payload.userId;

            // Save the updated login state to localStorage
            localStorage.setItem('loginState', JSON.stringify(state));
        },
        logout: (state) => {
            state.userLoggedIn = false;
            state.userId = null;

            // Remove login state from localStorage when user logs out
            localStorage.removeItem('loginState');
        },
    }
});

export const { changeLoggedinState, logout } = loginSlice.actions;

export default loginSlice.reducer;
