import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  likedCards: string[];
  filter: boolean;
}

const loadLikedCards = () => {
  const saved = localStorage.getItem('likedCards');
  return saved ? JSON.parse(saved) : [];
};

const initialState: CardState = {
  likedCards: loadLikedCards(),
  filter: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const index = state.likedCards.indexOf(action.payload);
      if (index >= 0) {
        state.likedCards.splice(index, 1);
      } else {
        state.likedCards.push(action.payload);
      }
      localStorage.setItem('likedCards', JSON.stringify(state.likedCards));
    },
    toggleFilter: (state) => {
      state.filter = !state.filter;
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.likedCards = state.likedCards.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleLike, toggleFilter, removeCard } = cardsSlice.actions;

export default cardsSlice.reducer;
