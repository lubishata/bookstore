// // src/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// // import booksReducers from './components/bookSlice';
// import {Book} from './components/GoogleSearvice/GoogleBooksService';


// interface BooksState {
//     books: Book[];
//     loading: boolean;
//     error: string | null;
//   }

//   const initialState: BooksState = {
//     books: [],
//     loading: false,
//     error: null,
//   };

// const store = configureStore({
//   reducer: {
//   }, // We will add reducers later
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from 'redux';
import authReducer from './components/Login/reducer/authSlice';
// import { productsApi } from "./features/apiSlice";
export const store: Store = configureStore({
  reducer: {
    auth: authReducer
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;