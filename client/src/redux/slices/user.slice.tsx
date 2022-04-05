import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import UserService from '../../services/user.service';
import { UserInitialTypes, updateTypes } from '../../types';

export const showUsers = createAsyncThunk(
  "moderator/users",
  async (_, thunkAPI) => {
    try {
      const response = await UserService.showUsers();
      thunkAPI.dispatch(setMessage((response.data.message)));
      return response.data.users;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'admin/user/:id',
  async({_id, roles }: updateTypes, thunkAPI) => {
    try {
      const response = await UserService.updateUser({_id, roles});
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const initialState: UserInitialTypes = {
  users: []
}

const userSlice = createSlice({
  name: 'user',
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

export const { clearUsers } = userSlice.actions;

const { reducer } = userSlice;
export default reducer;