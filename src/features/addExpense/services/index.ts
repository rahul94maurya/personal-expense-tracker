import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ExpenseCategory,
  ExpenseMode,
  ExpenseSubcategory,
  SaveExpensePayloadType,
} from "../types";
import { apiClient } from "../../../services/apiClient";

const getExpenseErrorMessage = (err: unknown) => {
  const error = err as AxiosError;
  if (error.response) {
    return (
      (error.response.data as { message: string })?.message ||
      "Failed to save expense"
    );
  }
  return error.message;
};

export const fetchExpenseCategory = async function (): Promise<
  ExpenseCategory[]
> {
  try {
    const response = await apiClient.get<ExpenseCategory[]>(
      "/expenses/categories",
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense categories", err);
    return [];
  }
};

export const fetchExpenseSubCategory = async function (
  id: string,
): Promise<ExpenseSubcategory[]> {
  try {
    const response = await apiClient.get<ExpenseSubcategory[]>(
      `/expenses/subcategories/${id}`,
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense subcategories", err);
    return [];
  }
};

export const fetchExpenseMode = async function (): Promise<ExpenseMode[]> {
  try {
    const response = await apiClient.get<ExpenseMode[]>(
      "/expenses/expense-modes",
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense modes", err);
    return [];
  }
};

export const saveExpense = createAsyncThunk(
  "addExpense/saveExpense",
  async (
    { expense, expenseId }: SaveExpensePayloadType,
    { rejectWithValue },
  ) => {
    try {
      const isEditMode = !!expenseId;
      const url = isEditMode
        ? `/expenses/update-expense/${expenseId}`
        : "/expenses/add-expense";

      const response = isEditMode
        ? await apiClient.put(url, expense)
        : await apiClient.post(url, expense);

      return response.data;
    } catch (err) {
      return rejectWithValue(getExpenseErrorMessage(err));
    }
  },
);
