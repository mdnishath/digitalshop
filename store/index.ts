import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { woocommerceApi } from "./services/woocommerceApi";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
    [woocommerceApi.reducerPath]: woocommerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(woocommerceApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
