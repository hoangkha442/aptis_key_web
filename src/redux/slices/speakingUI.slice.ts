import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SpeakingQuestion {
  id: number;
  prompt: string;
  image_url?: string | null;
  audio_url?: string | null;
  part_number: number;
  suggested_time: number;
}

export interface SpeakingState {
  stage: "intro" | "info" | "test";
  groupedQuestions: { [part: string]: SpeakingQuestion[] };
  currentPart: string;
  currentQuestionIndex: number;
  recordedAnswers: { [id: number]: Blob };
}

export const initialSpeakingState: SpeakingState = {
  stage: "intro",
  groupedQuestions: {},
  currentPart: "",
  currentQuestionIndex: 0,
  recordedAnswers: {},
};

const speakingUISlice = createSlice({
  name: "speakingUI",
  initialState: initialSpeakingState,
  reducers: {
    setSpeakingGroupedQuestions(state, action: PayloadAction<{ [part: string]: SpeakingQuestion[] }>) {
      state.groupedQuestions = action.payload;
      const firstPart = Object.keys(action.payload)[0];
      state.currentPart = firstPart;
    },
    setSpeakingCurrentPart(state, action: PayloadAction<string>) {
      state.currentPart = action.payload;
    },
    setSpeakingAnswer(state, action: PayloadAction<{ id: number; blob: Blob }>) {
      state.recordedAnswers[action.payload.id] = action.payload.blob;
    },
    setSpeakingStage(state, action: PayloadAction<"intro" | "info" | "test">) {
      state.stage = action.payload;
    },
    setSpeakingCurrentQuestionIndex(state, action: PayloadAction<number>) {
  state.currentQuestionIndex = action.payload;
},
    resetSpeakingState() {
      return initialSpeakingState;
    },
  },
});

export const {
  setSpeakingGroupedQuestions,
  setSpeakingCurrentPart,
  setSpeakingAnswer,
  setSpeakingStage,
  resetSpeakingState,
  setSpeakingCurrentQuestionIndex
} = speakingUISlice.actions;

export default speakingUISlice.reducer;