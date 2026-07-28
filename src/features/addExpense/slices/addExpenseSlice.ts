import { createSlice } from "@reduxjs/toolkit";
import { InitialAddExpenseStatus } from "../types";
import { saveExpense } from "../services";

const initialState: InitialAddExpenseStatus = {
  status: "idle",
  error: null,
};

const addExpenseSlice = createSlice({
  name: "addExpense",
  initialState,
  reducers: {
    resetAddExpenseStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(saveExpense.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(saveExpense.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(saveExpense.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as string | null;
    });
  },
  selectors: {
    selectAddExpenseLoadingStatus(state) {
      return state.status;
    },
    selectAddExpenseErrorMessage(state) {
      return state.error;
    },
  },
});

export const { resetAddExpenseStatus } = addExpenseSlice.actions;

export const { selectAddExpenseLoadingStatus, selectAddExpenseErrorMessage } =
  addExpenseSlice.selectors;

export default addExpenseSlice.reducer;
