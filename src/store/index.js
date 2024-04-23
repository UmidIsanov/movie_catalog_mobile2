import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { moviesApi } from "./api/moviesApi";

const ownReducer = combineReducers({
  [moviesApi.reducerPath]: moviesApi.reducer,
});

export const store = configureStore({
  reducer: ownReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat([moviesApi.middleware]),
});
