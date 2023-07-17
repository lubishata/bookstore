// // src/booksSlice.ts
// import {
//     createSlice,
//     PayloadAction,
//     createAsyncThunk,
//     AsyncThunkAction,
//     SerializedError,
//   } from '@reduxjs/toolkit';
//   import { Book, searchBooks } from './GoogleSearvice/GoogleBooksService';
  
//   interface BooksState {
//     books: Book[];
//     loading: boolean;
//     error: string | null;
//   }
  
//   const initialState: BooksState = {
//     books: [],
//     loading: false,
//     error: null,
//   };
  
//   export const fetchBooks = createAsyncThunk('books/fetchBooks', async (query: string) => {
//     try {
//       const books = await searchBooks(query);
//       return books;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   });
  
//   const booksSlice = createSlice({
//     name: 'books',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchBooks.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
//           state.books = action.payload;
//           state.loading = false;
//           state.error = null;
//         })
//         .addCase(fetchBooks.rejected, (state, action: PayloadAction<AsyncThunkAction<SerializedError>>) => {
//           state.books = [];
//           state.loading = false;
//           state.error = action.payload?.error?.message ?? 'Unknown error';
//         });
//     },
//   });
  
//   export default booksSlice.reducer;
  

// import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { searchBooks, Book } from './GoogleSearvice/GoogleBooksService';

//   interface BooksState {
//     books: any;
//     loading: boolean;
//     error: string | null;
//   }

//     const initialState: BooksState = {
//     books: [],
//     loading: false,
//     error: null,
//   };
//   const booksSlice = createSlice({
//     name: 'books',
//     initialState,
//     reducers: {
//       fetchBooksStart(state) {
//         state.loading = true;
//         state.error = null;
//       },
//       fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
//         state.books = action.payload;
//         state.loading = false;
//         state.error = null;
//       },
//       fetchBooksFailure(state, action: PayloadAction<string>) {
//         state.books = [];
//         state.loading = false;
//         state.error = action.payload;
//       },
//     },
//   });

//   export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;
//   export default booksSlice.reducer;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const productsApi = createApi({
//     reducerPath:"productsApi",
//     baseQuery: fetchBaseQuery({baseUrl:'https://dummyjson.com/'}),
//     endpoints: (builder) => ({
//         getAllProducts: builder.query({
//             query: () => "products",
//         })
//     })
// });

// export const { useGetAllProductsQuery } = productsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (product) => `products/search?q=${product}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;