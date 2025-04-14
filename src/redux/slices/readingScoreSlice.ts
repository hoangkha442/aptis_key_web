// src/redux/slices/readingScoreSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReadingScoreState {
  totalScore: number;
  cefr: string;
}

const initialState: ReadingScoreState = {
  totalScore: 0,
  cefr: "",
};

const readingScoreSlice = createSlice({
  name: "readingScore",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<ReadingScoreState>) => {
      state.totalScore = action.payload.totalScore;
      state.cefr = action.payload.cefr;
    },
    resetScore: (state) => {
      state.totalScore = 0;
      state.cefr = "";
    },
  },
});

export const { setScore, resetScore } = readingScoreSlice.actions;
export default readingScoreSlice.reducer;
