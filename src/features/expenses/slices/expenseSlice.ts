import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseDataType, ExpensesType, InitialExpenseType } from "../types";
import { fetchExpenseList } from "../services";
import { generateExpenseData } from "../../../utils";

const initialState: InitialExpenseType = {
  status: "idle",
  error: null,
  expenseList: [],
  expenseData: {} as ExpenseDataType,
};
const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchExpenseList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchExpenseList.fulfilled,
      (state, action: PayloadAction<ExpensesType[]>) => {
        state.status = "success";
        state.expenseList = action.payload;
        state.expenseData = generateExpenseData(action.payload);
      }
    );
    builder.addCase(fetchExpenseList.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as string | null;
    });
  },
  selectors: {
    selectLoadingStatus(state) {
      return state.status;
    },
    selectErrorMessage(state) {
      return state.error;
    },
    selectExpenseList(state) {
      return state.expenseList;
    },
    selectExpenseData(state) {
      return state.expenseData;
    },
  },
});

export const {
  selectErrorMessage,
  selectLoadingStatus,
  selectExpenseList,
  selectExpenseData,
} = expenseSlice.selectors;

export default expenseSlice.reducer;
