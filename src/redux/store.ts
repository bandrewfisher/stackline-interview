import { configureStore } from "@reduxjs/toolkit";
import salesDataReducer from "./salesData/salesDataSlice";

const store = configureStore({
  reducer: {
    salesData: salesDataReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
