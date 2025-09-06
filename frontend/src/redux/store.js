import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/AuthSlice.js'

export default configureStore({
  reducer: {
    auth : authReducer,
  },
})