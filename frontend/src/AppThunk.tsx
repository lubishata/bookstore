// src/AppThunk.ts
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define the custom AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppAction>;

// Define the base action type (you can customize this based on your needs)
export interface AppAction {
  type: string;
  payload?: any;
}
