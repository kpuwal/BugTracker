import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';

const initialState: Message = {
  message: ''
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      // console.log("message ", action.payload)
      return { message: action.payload };
    },
    clearMessage: () => {
      return {message: ''}
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
