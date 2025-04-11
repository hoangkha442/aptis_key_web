import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listeningService } from "../../config/listeningServices";

export const getListeningTestById = createAsyncThunk(
  "listening/fetchById",
  async (testId: number) => {
    const response = await listeningService.getListeningTestById({
      listening_test_id: testId,
    });
    return response.data;
  }
);

const listeningSlice = createSlice({
  name: "listening",
  initialState: {
    data: null,
    groupedItems: {} as Record<string, any[]>,
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListeningTestById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getListeningTestById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;

        const grouped: Record<string, any[]> = {};
        const items = Array.isArray(action.payload?.listening_test_items)
          ? action.payload.listening_test_items
          : [];

        for (const item of items) {
          const match = item.question_number?.match(/Question (\d+)/);
          const key = match ? `Question ${match[1]}` : "Other";
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(item);
        }

        state.groupedItems = grouped;
      })
      .addCase(getListeningTestById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load listening test";
      });
  }
});

export default listeningSlice.reducer;
