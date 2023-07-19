import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginState {
  loading: boolean;
  error: string | null;
  data?: Object;
  userType: string;
  token?: string | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
  userType: "anonymousUser",
  token: null
};


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetchLoginStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLoginSuccess(state, action: PayloadAction<LoginState>) {
      state.loading = false;
      state.userType = action.payload.userType;
      state.token = action.payload.token;
    },
    fetchLoginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { fetchLoginStart, fetchLoginSuccess, fetchLoginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;


// Thunk function to handle login
export const login = (username: string, password: string): any => async (dispatch: any) => {
  try {
    dispatch(fetchLoginStart());
    const body = {
      "email": username,
      "password": password
    }
    // Replace 'https://example.com/api/login' with your backend login endpoint
    const response = await fetch(' http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    const token = data.access_token; // Assuming the backend response contains the access token
    // console.log(token);
    // document.cookie = "access_token=" + token;
    // console.log(document.cookie);
    window.location.href = window.location.host;
    dispatch(fetchLoginSuccess(token));
  } catch (error) {
    dispatch(fetchLoginFailure("error" || 'Login failed'));
  }
};
