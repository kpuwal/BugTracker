import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authInitStateType } from '../types';

const initialState: authInitStateType = {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    catchLogin: (state, action: PayloadAction<authInitStateType>) => {
      Object.assign(state, action.payload);
    }
  },
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
