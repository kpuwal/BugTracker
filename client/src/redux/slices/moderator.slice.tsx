import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import ModeratorService from '../../services/moderator.service';
import { ModeratorInitialTypes } from '../../types';

export const showUsers = createAsyncThunk(
  "user/bugs",
  async (_, thunkAPI) => {
    try {
      const response = await ModeratorService.showUsers();
      // thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data.users;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: ModeratorInitialTypes = {
  users: []
}

const moderatorSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUsers: (state, action) => {
      state.users = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(showUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
  }
})

export const { clearUsers } = moderatorSlice.actions;

const { reducer } = moderatorSlice;
export default reducer;