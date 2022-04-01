import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import CardService from '../../services/card.service';
import { cardTypes, cardSliceTypes } from '../../types';

export const createCard = createAsyncThunk(
  "moderator/bug",
  async ({title, description, category}: cardTypes, thunkAPI) => {
    try {
      const response = await CardService.addCard({title, description, category});
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: cardSliceTypes = {
  isCreated: false,
  cards: []
}

const cardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCard.fulfilled, (state, _action) => {
      state.isCreated = true;
    })
  }
})

const { reducer } = cardSlice;
export default reducer;