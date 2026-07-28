import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenses/slices/expenseSlice";
import authReducer from "../features/auth/slices/authSlice";
import addExpenseReducer from "../features/addExpense/slices/addExpenseSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
    addExpense: addExpenseReducer,
  },
});

export type StoreGetState = typeof store.getState;

export type AppStore = ReturnType<StoreGetState>;

export type AppDispatch = typeof store.dispatch;
