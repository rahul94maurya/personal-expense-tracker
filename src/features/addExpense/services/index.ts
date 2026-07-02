import axios from "axios";
import { EXPENSE_API_BASE_URL } from "../../../data/constants";
import {
  ExpenseCategory,
  ExpenseMode,
  ExpenseSubcategory,
} from "../types";

export const fetchExpenseCategory = async function (): Promise<
  ExpenseCategory[]
> {
  try {
    const response = await axios.get<ExpenseCategory[]>(
      `${EXPENSE_API_BASE_URL}/categories`
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense categories", err);
    return [];
  }
};

export const fetchExpenseSubCategory = async function (
  id: string
): Promise<ExpenseSubcategory[]> {
  try {
    const response = await axios.get<ExpenseSubcategory[]>(
      `${EXPENSE_API_BASE_URL}/subcategories/${id}`
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense subcategories", err);
    return [];
  }
};

export const fetchExpenseMode = async function (): Promise<ExpenseMode[]> {
  try {
    const response = await axios.get<ExpenseMode[]>(
      `${EXPENSE_API_BASE_URL}/expense-modes`
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch expense modes", err);
    return [];
  }
};
