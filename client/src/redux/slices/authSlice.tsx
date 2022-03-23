import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authType } from '../../types';

const initialState: authType = {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("updateUser ", action.payload)
      // state.name = action.payload.name
      Object.assign(state, action.payload);
    },
    registerUser: (state, action: PayloadAction<authType>) => {
      console.log(action.payload)
      Object.assign(state, action.payload);
    },
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

export const { updateUser, registerUser } = authSlice.actions;
export default authSlice.reducer;
