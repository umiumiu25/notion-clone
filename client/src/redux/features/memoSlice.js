import { createSlice } from "@reduxjs/toolkit";

const initialState = { values: [] };

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemos: (state, action) => {
      state.values = action.payload;
    }
  }
});

export const { setMemos } = memoSlice.actions;
export default memoSlice.reducer;