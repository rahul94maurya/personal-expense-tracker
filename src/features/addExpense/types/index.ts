import { ExpensesType } from "../../expenses/types";
import { StatusType } from "../../../types";

export interface AddNewExpenseProps {
  handleClose: () => void;
  openModal: boolean;
  onExpenseAdded?: () => void;
  expenseToEdit?: ExpensesType | null;
}

export interface ExpenseSubcategory {
  id: string;
  name: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
}

export interface ExpenseMode {
  id: string;
  name: string;
}

export type SaveExpenseDetailsType = {
  amount: number;
  description: string;
  category?: string;
  subCategory?: string;
  expenseMode?: string;
  expenseDate: string;
};

export type SaveExpensePayloadType = {
  expense: SaveExpenseDetailsType;
  expenseId?: string;
};

export interface InitialAddExpenseStatus {
  status: StatusType;
  error: null | string;
}
