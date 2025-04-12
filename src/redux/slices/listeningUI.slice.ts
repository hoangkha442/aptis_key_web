import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListeningState {
  activePart: number;
  answers: Record<string, string>;
  score: number;  // Lưu điểm
  reviewAnswers: any[];  // Lưu câu trả lời chi tiết (đúng / sai)
}

const initialState: ListeningState = {
  activePart: 1,
  answers: {},
  score: 0,
  reviewAnswers: [],  // Mảng lưu câu trả lời cho phần review
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
    resetListeningTestState(state) {
      state.activePart = 1;
      state.answers = {};
      state.score = 0;
      state.reviewAnswers = [];
    },
  },
});

export const {
  setActiveListeningPart,
  setListeningAnswer,
  setListeningReviewAnswers, 
  resetListeningTestState,
} = listeningUISlice.actions;

export default listeningUISlice.reducer;
