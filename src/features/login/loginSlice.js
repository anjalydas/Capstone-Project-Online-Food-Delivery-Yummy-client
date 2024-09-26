import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userLoggedIn: false,
        user: null, // Add a user field to store user information
    },
    reducers: {
        changeLoggedinState: (state, action) => {
            state.userLoggedIn = action.payload;
        },
        setUser: (state, action) => { // New action to set user information
            state.user = action.payload;
        }
    }
});

export const { changeLoggedinState, setUser } = loginSlice.actions;

export default loginSlice.reducer;
