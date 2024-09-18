import { configureStore } from '@reduxjs/toolkit'

import loginSlice from '../features/login/loginSlice.js'
import cartSlice from '../features/cart/cartSlice.js'
export default configureStore({
  reducer: {
    login : loginSlice,
    cart : cartSlice
  }
})