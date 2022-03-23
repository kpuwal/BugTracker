import { createSlice } from '@reduxjs/toolkit';
import MessageType from '../../types';

const initialState: MessageType = {
  message: ''
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (_state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions
export default reducer;