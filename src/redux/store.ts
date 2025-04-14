import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import listeningReducer from "./slices/listeningSlice";
import listeningUIReducer from "./slices/listeningUI.slice"; 
import readingScoreReducer from "./slices/readingScoreSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    listening: listeningReducer,
    listeningUI: listeningUIReducer,
    readingScore: readingScoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
