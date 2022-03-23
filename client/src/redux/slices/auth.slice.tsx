import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import AuthService from '../../services/auth.service';
import { authType, User, authSliceTypes } from '../../types';

const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

export const register: AsyncThunk<any, authType, {}> = createAsyncThunk(
  "auth/register",
  async ({name, email, password}: authType, thunkAPI) => {
    try {
      const response = await AuthService.register({name, email, password});
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({email, password}: authType, thunkAPI) => {
    try {
      const data = await AuthService.login({email, password});
      return { user: data };
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState: authSliceTypes = user
? {isLoggedIn: true, user }
: {isLoggedIn: false, user: null}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, _action) => {
      state.isLoggedIn = false;
    })
    builder.addCase(register.rejected, (state, _action) => {
      state.isLoggedIn = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    })
    builder.addCase(login.rejected, (state, _action) => {
      state.isLoggedIn = false;
      state.user = null;
    })
    builder.addCase(logout.fulfilled, (state, _action) => {
      state.isLoggedIn = false;
      state.user = null;
    })
  }
})

const { reducer } = authSlice;
export default reducer;