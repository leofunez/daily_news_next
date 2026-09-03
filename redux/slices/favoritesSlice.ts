import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesStateType {
  favorites: number[]
}

const initialState: FavoritesStateType = {
  favorites: []
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload
    },

    setFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      } else {
        state.favorites = state.favorites.filter((id: number) => id !== action.payload)
      }
    },
  }
});

export const selectFavorites = (state: { favorites: FavoritesStateType }) => state.favorites.favorites;

export const { setFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
