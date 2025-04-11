import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLocalStorage } from '../../config/userLocal';

interface AuthState {
  token: string | null;
  role: string | null;
}

const localUser = userLocalStorage.get();

const initialState: AuthState = {
  token: localUser?.token || null,
  role: localUser?.role || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
