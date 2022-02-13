import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SelectState {
  isExpanded: boolean;
  value: string;
  optionIndex: number;
}

const initialState: SelectState = {
  isExpanded: false,
  value: '',
  optionIndex: 0,
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    expand: (state) => {
      state.isExpanded = true;
    },
    collapse: (state) => {
      state.isExpanded = false;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setOptionIndex: (state, action) => {
      state.optionIndex = action.payload;
    },
  },
});

export const { expand, collapse, setValue, setOptionIndex } = selectSlice.actions;

// Selectors.
export const selectState = (state: RootState) => state.select;
export const selectIsExpanded = (state: RootState) => state.select.isExpanded;
export const selectValue = (state: RootState) => state.select.value;
export const selectCurrentIndex = (state: RootState) => state.select.optionIndex;

export default selectSlice.reducer;
