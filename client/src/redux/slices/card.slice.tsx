import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import CardService from '../../services/card.service';
import { cardTypes, cardSliceTypes } from '../../types';

export const createCard = createAsyncThunk(
  "moderator/bug",
  async ({title, description, createdBy, category}: cardTypes, thunkAPI) => {

    try {
      const response = await CardService.addCard({title, description, createdBy, category});
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
); 

export const showCards = createAsyncThunk(
  "user/bugs",
  async (_, thunkAPI) => {
    try {
      const response = await CardService.readCards();
      console.log(response.data.bugs)
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
    builder.addCase(createCard.rejected, (state, _action) => {
      state.isCreated = false;
    })
    builder.addCase(showCards.fulfilled, (state, action) => {
      state.cards = state.cards.concat(action.payload)
    })
  }
})

const { reducer } = cardSlice;
export default reducer;