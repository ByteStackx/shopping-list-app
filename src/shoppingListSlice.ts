import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as api from './shoppingListApi';

export interface ShoppingListItem {
  id?: number;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  image?: string;
}

interface ShoppingListState {
  items: ShoppingListItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchLists = createAsyncThunk('shoppingList/fetchLists', async () => {
  return await api.fetchLists();
});

export const addList = createAsyncThunk('shoppingList/addList', async (item: ShoppingListItem) => {
  return await api.addList(item);
});

export const updateList = createAsyncThunk('shoppingList/updateList', async ({ id, item }: { id: number; item: ShoppingListItem }) => {
  return await api.updateList(id, item);
});

export const deleteList = createAsyncThunk('shoppingList/deleteList', async (id: number) => {
  await api.deleteList(id);
  return id;
});

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLists.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action: PayloadAction<ShoppingListItem[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch lists';
      })
      .addCase(addList.fulfilled, (state, action: PayloadAction<ShoppingListItem>) => {
        state.items.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action: PayloadAction<ShoppingListItem>) => {
        state.items = state.items.map(i => (i.id === action.payload.id ? action.payload : i));
      })
      .addCase(deleteList.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  },
});

export default shoppingListSlice.reducer;
