import { createSlice } from "@reduxjs/toolkit"


export const loginSlice = createSlice({
  name: 'login',
  initialState: {
   userLoggedIn: false
  },
  reducers: {
    
    changeLoggedinState: (state, action) => {
      state.userLoggedIn = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeLoggedinState } = loginSlice.actions

export default loginSlice.reducer