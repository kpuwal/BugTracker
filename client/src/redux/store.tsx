import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import messageReducer from './slices/message.slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
