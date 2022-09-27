import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { apiSlice } from "./apiSlices/lastAirBenderSlice";
import rickAndMortySlice from "./apiSlices/rickAndMortySlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    categories: categorySlice,
    morty: rickAndMortySlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
