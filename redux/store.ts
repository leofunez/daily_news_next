import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import favoritesReducer from "./slices/favoritesSlice";
import { favoritesApi } from "./api/favoritesApi";
import { wpApi } from "./api/wpApi";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    'favoritesAPI': favoritesApi.reducer,
    'wpAPI': wpApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat([favoritesApi.middleware, wpApi.middleware])
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
