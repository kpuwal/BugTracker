import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authInitStateType } from '../types';

const initialState: authInitStateType = {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
}

const authSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchTitles.fulfilled, (state, action) => {
    //   state.titles = action.payload
    // })
    // builder.addCase(fetchHeadlines.fulfilled, (state, action) => {
    //   state.headlines = action.payload
    // })
  },
})

export default authSlice.reducer;
