import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import listeningReducer from "./slices/listeningSlice";
import listeningUIReducer from "./slices/listeningUI.slice";
import readingScoreReducer from "./slices/readingScoreSlice";
import writingUIReducer, {
  WritingState,
  initialWritingState,
} from "./slices/writingUI.slice";

const loadWritingUI = (): WritingState | undefined => {
  try {
    const data = localStorage.getItem("writingUI");
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load writingUI from localStorage:", err);
  }
  return undefined;
};

const preloadedState = {
  writingUI: loadWritingUI() || initialWritingState,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listening: listeningReducer,
    listeningUI: listeningUIReducer,
    readingScore: readingScoreReducer,
    writingUI: writingUIReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const { writingUI } = store.getState();
    localStorage.setItem("writingUI", JSON.stringify(writingUI));
  } catch (err) {
    console.error("Failed to save writingUI:", err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
