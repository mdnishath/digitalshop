import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  categoryId: number | null;
  searchTerm: string;
}

const initialState: FilterState = {
  categoryId: null,
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number | null>) {
      state.categoryId = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSearchTerm } = filterSlice.actions;
export default filterSlice.reducer;
