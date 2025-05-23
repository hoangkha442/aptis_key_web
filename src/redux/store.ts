import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import listeningReducer from "./slices/listeningSlice";
import listeningUIReducer from "./slices/listeningUI.slice";
import readingScoreReducer from "./slices/readingScoreSlice";
import writingUIReducer, {
  WritingState,
  initialWritingState,
} from "./slices/writingUI.slice";
import speakingUIReducer, {
  SpeakingState,
  initialSpeakingState,
} from "./slices/speakingUI.slice";


const loadWritingUI = (): WritingState | undefined => {
  try {
    const data = localStorage.getItem("writingUI");
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load writingUI from localStorage:", err);
  }
  return undefined;
};
const loadSpeakingUI = (): SpeakingState | undefined => {
  try {
    const data = localStorage.getItem("speakingUI");
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load speakingUI from localStorage:", err);
  }
  return undefined;
};


const preloadedState = {
  writingUI: loadWritingUI() || initialWritingState,
  speakingUI: loadSpeakingUI() || initialSpeakingState,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listening: listeningReducer,
    listeningUI: listeningUIReducer,
    readingScore: readingScoreReducer,
    writingUI: writingUIReducer,
    speakingUI: speakingUIReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const { writingUI, speakingUI } = store.getState();
    localStorage.setItem("writingUI", JSON.stringify(writingUI));
    localStorage.setItem("speakingUI", JSON.stringify(speakingUI));
  } catch (err) {
    console.error("Failed to save UI state:", err);
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
