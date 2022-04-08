import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import { clearCards } from './card.slice';
import AuthService from '../../services/auth.service';
import { authType, User, authSliceTypes } from '../../types';

// @ts-ignore
// const user: TokenUser | null = JSON.parse(localStorage.getItem("user"));
const initialUser: User = {
  _id: "",
  name: "",
  email: "",
  roles: {admin: false, moderator: false, user: true},
}

export const register = createAsyncThunk(
  "auth/register",
  async ({name, email, password}: authType, thunkAPI) => {
    try {
      const response = await AuthService.register({name, email, password});
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
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
      return data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    AuthService.logout();
    thunkAPI.dispatch(clearCards([]));
  }
);

const initialState: authSliceTypes =
{
  isLoggedIn: false, 
  user: initialUser,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, _action) => {
      state.isLoggedIn = false;
    })
    builder.addCase(register.rejected, (state, _action) => {
      state.isLoggedIn = false;
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    })
    builder.addCase(login.rejected, (state, _action) => {
      state.isLoggedIn = false;
      // state.user = null;
    })
    builder.addCase(logout.fulfilled, (state, _action) => {
      state.isLoggedIn = false;
      // state.user = null;
    })
  }
})

const { reducer } = authSlice;
export default reducer;