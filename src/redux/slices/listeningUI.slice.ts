import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListeningState {
  activePart: number;
  answers: Record<string, string>;
  isSubmitted: boolean;
  score: number; 
  reviewAnswers: any[]; 
}

const initialState: ListeningState = {
  activePart: 1,
  answers: {},
  isSubmitted: false,
  score: 0,
  reviewAnswers: [],
};
const listeningUISlice = createSlice({
  name: "listeningUI",
  initialState,
  reducers: {
    setActiveListeningPart(state, action: PayloadAction<number>) {
      state.activePart = action.payload;
    },
    setListeningAnswer(
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    setListeningReviewAnswers(
      state, 
      action: PayloadAction<any[]> // Lưu thông tin câu trả lời chi tiết khi review
    ) {
      state.reviewAnswers = action.payload;
    },
    setListeningReviewAnswersAndScore(
      state,
      action: PayloadAction<{ reviewAnswers: ListeningState["reviewAnswers"]; score: number }>
    ) {
      state.reviewAnswers = action.payload.reviewAnswers;
      state.score = action.payload.score;
      state.isSubmitted = true;
      state.activePart = 1; 
    },
    resetListeningTestState(state) {
      state.activePart = 1;
      state.answers = {};
      state.score = 0;
      state.reviewAnswers = [];
      state.isSubmitted = false;
    },
  },
});

export const {
  setActiveListeningPart,
  setListeningAnswer,
  setListeningReviewAnswers, 
  resetListeningTestState,
  setListeningReviewAnswersAndScore
} = listeningUISlice.actions;

export default listeningUISlice.reducer;
