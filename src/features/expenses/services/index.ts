import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiExpense, ExpensesType } from "../types";
import { apiClient } from "../../../services/apiClient";

const mapExpenseResponse = (expense: ApiExpense): ExpensesType => ({
  id: expense.id,
  expenseAmount: expense.amount,
  expenseDescription: expense.description ?? "",
  categoryName: expense.category?.name ?? "",
  subCategoryName: expense.subcategory?.name ?? "",
  paymentType: expense.expenseMode?.name ?? "",
  createdAt: expense.expenseDate,
  updatedAt: expense.expenseDate,
});

export const deleteExpense = async (id: string): Promise<void> => {
  await apiClient.delete(`/expenses/delete-expense/${id}`);
};

export const fetchExpenseList = createAsyncThunk(
  "expenses/fetchExpenseList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ApiExpense[]>("/expenses");
      return response.data.map(mapExpenseResponse);
    } catch (err) {
      console.error("Failed to fetch expense list", err);
      return rejectWithValue("Failed to fetch expense list");
    }
  },
);
