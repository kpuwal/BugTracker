import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../types';

const initialState: Message = {
  message: ''
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      console.log("message ", action.payload)
      state.message = action.payload;
    },
    clearMessage: () => {
      return {message: ''}
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
