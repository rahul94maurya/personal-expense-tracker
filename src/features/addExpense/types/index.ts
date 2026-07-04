import { ExpensesType } from "../../expenses/types";

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
