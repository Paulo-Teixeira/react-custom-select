import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Option } from './selectAPI';

export interface SelectState {
  isExpanded: boolean;
  value: string;
  optionIndex: number;
  optionHeight: number;
  options: Option[] | null;
  safeMode: boolean;
}

const initialState: SelectState = {
  isExpanded: false,
  value: '',
  optionIndex: 0,
  optionHeight: 0,
  options: null,
  safeMode: false,
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
    setOptionHeight: (state, action) => {
      state.optionHeight = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setSafeMode: (state) => {
      state.safeMode = true;
    },
  },
});

export const {
  expand,
  collapse,
  setValue,
  setOptionIndex,
  setOptionHeight,
  setOptions,
  setSafeMode,
} = selectSlice.actions;

export const selectState = (state: RootState) => state.select;
export const selectIsExpanded = (state: RootState) => state.select.isExpanded;
export const selectValue = (state: RootState) => state.select.value;
export const selectCurrentIndex = (state: RootState) => state.select.optionIndex;
export const selectOptionHeight = (state: RootState) => state.select.optionHeight;
export const selectOptionsList = (state: RootState) => state.select.options;
export const selectSafeMode = (state: RootState) => state.select.safeMode;

export default selectSlice.reducer;
