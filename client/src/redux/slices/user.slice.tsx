import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import UserService from '../../services/user.service';
import { UserInitialTypes, updateTypes, deleteTypes, User } from '../../types';

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
  'admin/user',
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

export const deleteUser = createAsyncThunk(
  'admin/user',
  async({_id }: deleteTypes, thunkAPI) => {
    try {
      const response = await UserService.deleteUser({_id});
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      thunkAPI.dispatch(showUsers());
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const initialState: UserInitialTypes = {
  users: [],
  isUpdated: false,
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
    builder.addCase(showUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    })
    builder.addCase(updateUser.fulfilled, (state, _action) => {
      state.isUpdated = true;
    })
    builder.addCase(updateUser.rejected, (state, _action) => {
      state.isUpdated = false;
    })
  }
})

export const { clearUsers } = userSlice.actions;

const { reducer } = userSlice;
export default reducer;