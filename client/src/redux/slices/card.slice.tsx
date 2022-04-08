import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setMessage } from './message.slice';
import CardService from '../../services/card.service';
import { CreateCardTypes, CardSliceTypes, deleteTypes, Card } from '../../types';

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
      thunkAPI.dispatch(showCards());

      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const updateCardStatus = createAsyncThunk(
  'user/bug/:id',
  async (card: Card, thunkAPI) => {
    try {
      const response = await CardService.updateCardStatus(card);
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const updateCardEdit = createAsyncThunk(
  'moderator/bug/:id',
  async (card: Card, thunkAPI) => {
    try {
      const response = await CardService.updateCardEdit(card);
      thunkAPI.dispatch(setMessage((response.data.message).toString()));
      return response.data;
    } catch (error: any) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
)

type cardsTypes = {
  toDo: Card[],
  doing: Card[],
  done: Card[],
}

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
    builder.addCase(showCards.fulfilled, (state, action: PayloadAction<cardsTypes>) => {
      state.cards = action.payload;
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