import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { moviesApi } from "./api/moviesApi";
import { peopleApi } from "./api/peopleApi";

const ownReducer = combineReducers({
  [moviesApi.reducerPath]: moviesApi.reducer,
  [peopleApi.reducerPath]: peopleApi.reducer,
});

export const store = configureStore({
  reducer: ownReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat([
      moviesApi.middleware,
      peopleApi.middleware,
    ]),
});
