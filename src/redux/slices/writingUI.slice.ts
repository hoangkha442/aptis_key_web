import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  id: number;
  prompt: string;
  from_name?: string | null;
  note?: string | null;
  word_limit: string;
  part_number: number
  answer_type: "short_text" | "paragraph" | "email";
}

export interface WritingState {
  stage: "intro" | "info" | "test";
  groupedQuestions: { [part: string]: Question[] };
  currentPart: string;
  answers: { [id: number]: string };
}

export const initialWritingState: WritingState = {
  stage: "intro",
  groupedQuestions: {},
  currentPart: "",
  answers: {},
};

const writingUISlice = createSlice({
  name: "writingUI",
  initialState: initialWritingState,
  reducers: {
    setGroupedQuestions(state, action: PayloadAction<{ [part: string]: Question[] }>) {
      state.groupedQuestions = action.payload;
      const firstPart = Object.keys(action.payload)[0];
      state.currentPart = firstPart;
    },
    setCurrentPart(state, action: PayloadAction<string>) {
      state.currentPart = action.payload;
    },
    setAnswer(state, action: PayloadAction<{ id: number; answer: string }>) {
      state.answers[action.payload.id] = action.payload.answer;
    },
    setWritingStage(state, action: PayloadAction<"intro" | "info" | "test">) {
      state.stage = action.payload;
    },
    resetWritingState() {
      return initialWritingState;
    },
  },
});

export const {
  setGroupedQuestions,
  setCurrentPart,
  setAnswer,
  resetWritingState,
  setWritingStage,
} = writingUISlice.actions;

export default writingUISlice.reducer;
