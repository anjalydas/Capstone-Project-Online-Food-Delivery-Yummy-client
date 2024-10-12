import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userLoggedIn: false,
        userId: null,
    },
    reducers: {
        changeLoggedinState: (state, action) => {
            console.log("Action Payload:", action.payload);
            state.userLoggedIn = action.payload.userLoggedIn;
            state.userId = action.payload.userId;
            console.log("Updated state in slice:", state);
        },
    }
});

export const { changeLoggedinState } = loginSlice.actions;

export default loginSlice.reducer;
