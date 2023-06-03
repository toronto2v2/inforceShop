import { configureStore } from "@reduxjs/toolkit";
import products from "../components/ProductsList/ProductsListSlice";

const store = configureStore({
    reducer: { products },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
