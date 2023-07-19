import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registrationStart(state) {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess(state) {
      state.loading = false;
    },
    registrationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registrationStart, registrationSuccess, registrationFailure } = registrationSlice.actions;

export default registrationSlice.reducer;

// Thunk function to handle registration
export const registerUser = (userData: { username: string; password: string }): any => async (dispatch:any) => {
  try {
    dispatch(registrationStart());

    const response = await fetch('https://example.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    dispatch(registrationSuccess());
  } catch (error) {
    dispatch(registrationFailure("error" || 'Registration failed'));
  }
};
