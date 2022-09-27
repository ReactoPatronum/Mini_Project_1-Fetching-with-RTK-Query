import { createSlice } from "@reduxjs/toolkit";

interface _Category {
  isActive: string | null;
  category: string | null;
}

const initialState = {
  isActive: null,
  category: null,
} as _Category;

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export default categorySlice.reducer;
export const { addCategory, addIsActive } = categorySlice.actions;
