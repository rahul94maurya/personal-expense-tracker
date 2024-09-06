import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenses/slices/expenseSlice";
import authReducer from "../features/auth/slices/authSlice";
export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
});

export type StoreGetState = typeof store.getState;

export type AppStore = ReturnType<StoreGetState>;

export type AppDispatch = typeof store.dispatch;
