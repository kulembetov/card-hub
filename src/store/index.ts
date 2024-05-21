import { configureStore } from '@reduxjs/toolkit';
import { pexelsApi } from '../utils/api';
import cardsReducer from './cardsSlice';

export const store = configureStore({
  reducer: {
    [pexelsApi.reducerPath]: pexelsApi.reducer,
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pexelsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
