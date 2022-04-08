import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import CardService from '../../services/card.service';
import { CreateCardTypes, CardSliceTypes, deleteTypes } from '../../types';

export const createCard = createAsyncThunk(
  "moderator/bug",
  async ({title, description, createdBy, category}: CreateCardTypes, thunkAPI) => {

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
      thunkAPI.dispatch(setMessage((response.data.message)));
      console.log(response.data, "cards")
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "moderator/bug/:id",
  async ({_id}: deleteTypes, thunkAPI) => {
    try {
      const response = await CardService.deleteCard({_id});
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const initialState: CardSliceTypes = {
  isCreated: false,
  cards: {
    toDo: [],
    doing: [],
    done: [],
  }
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    clearCards: (state, action) => {
      state.cards = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createCard.fulfilled, (state, _action) => {
      state.isCreated = true;
    })
    builder.addCase(createCard.rejected, (state, _action) => {
      state.isCreated = false;
    })
    builder.addCase(showCards.fulfilled, (state, action) => {
      state.cards.toDo = action.payload.toDo;
      state.cards.doing = action.payload.doing;
      state.cards.done = action.payload.done;
    })
    // builder.addCase(showCards.rejected, (state, _action) => {
    //   state.isCreated = false;
    // })
    // builder.addCase(deleteCard.fulfilled, (state, _action) => {
    //   state.
    // })
  }
})

export const { clearCards } = cardSlice.actions;

const { reducer } = cardSlice;
export default reducer;