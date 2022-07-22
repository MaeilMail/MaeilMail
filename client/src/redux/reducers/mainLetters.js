import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  mainComingLetters: [],
  mainArrivedLetter: {},
};

const mainLettersSlice = createSlice({
  name: 'mainLetters',
  initialState,
  reducers: {
    initComingLetters(state, action) {
      const { mainComingLetters } = action.payload;
      state.mainComingLetters = mainComingLetters;
    },
    initArrivedLetter(state, action) {
      const { mainArrivedLetter } = action.payload;
      state.mainArrivedLetter = mainArrivedLetter;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});
export const { initComingLetters, initArrivedLetter } =
  mainLettersSlice.actions;
export default mainLettersSlice;
