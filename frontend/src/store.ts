import { configureStore } from "@reduxjs/toolkit";
import { Store } from 'redux';
import { useDispatch } from 'react-redux'
import bookReducer from './components/Books/reducer/bookSlice';
import loginReducer from './components/Login/reducer/loginSlice';
import registrationReducer from './components/Registration/reducer/registrationSlice';
export const store: Store = configureStore({
  reducer: {
    books:bookReducer,
    login:loginReducer,
    registration:registrationReducer,
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch