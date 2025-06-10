// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../slice/productSlice/categorySlice';
import productSlice from "../slice/productSlice/productSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    product:productSlice,
    // user: userReducer,
    // product: productReducer,
    // add more reducers here
  },
  // You can add middleware or devTools options here if needed
});

export default store;
