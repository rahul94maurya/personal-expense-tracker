import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenses/slices/expenseSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export type StoreGetState = typeof store.getState;

export type AppStore = ReturnType<StoreGetState>;

export type AppDispatch = typeof store.dispatch;
