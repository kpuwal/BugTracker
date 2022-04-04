import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import CardService from '../../services/card.service';
import { CardTypes, cardSliceTypes } from '../../types';

export const createCard = createAsyncThunk(
  "moderator/bug",
  async ({title, description, createdBy, category}: CardTypes, thunkAPI) => {

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
      // thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data.bugs;
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
      console.log(action.payload, " from action payload")
      state.cards = action.payload;
    })
    builder.addCase(showCards.rejected, (state, action) => {
      console.log("why rejecting?")
      state.isCreated = false;
    })
  }
})

const { reducer } = cardSlice;
export default reducer;