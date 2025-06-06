// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../slice/productSlice/categorySlice';

const store = configureStore({
  reducer: {
    category: categorySlice,
    // user: userReducer,
    // product: productReducer,
    // add more reducers here
  },
  // You can add middleware or devTools options here if needed
});

export default store;
