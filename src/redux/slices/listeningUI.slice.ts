import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListeningState {
  activePart: number;
  answers: Record<string, string>; 
}

const initialState: ListeningState = {
  activePart: 1,
  answers: {},
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
    resetListeningTestState(state) {
      state.activePart = 1;
      state.answers = {};
    },
  },
});

export const {
  setActiveListeningPart,
  setListeningAnswer,
  resetListeningTestState,
} = listeningUISlice.actions;

export default listeningUISlice.reducer;
