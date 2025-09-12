import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import shoppingListReducer from './shoppingListSlice';
import type { AuthState } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer as (state: AuthState | undefined, action: any) => AuthState,
    shoppingList: shoppingListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
