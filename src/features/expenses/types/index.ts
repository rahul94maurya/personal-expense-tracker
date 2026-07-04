import { StatusType } from "../../../types";

export interface ApiExpense {
  id: string;
  expenseDate: string;
  amount: number;
  description?: string;
  category: { _id: string; name: string };
  subcategory: { _id: string; name: string };
  expenseMode: { _id: string; name: string };
}

export interface ExpensesType {
  id: string;
  expenseAmount: number;
  expenseDescription: string;
  categoryName: string;
  subCategoryName: string;
  paymentType: string;
  createdAt: string;
  updatedAt: string;
}

export interface DayExpenseType {
  date: string;
  id: string;
  totalExpenseOfTheDay: number;
  expenses: ExpensesType[];
}
export interface ExpenseDataType {
  currentMonth: string;
  currentYear: string;
  totalAmount: number;
  dayWiseExpense: DayExpenseType[];
}
export interface ExpenseCardProps {
  expenseData: DayExpenseType[];
  onDeleteRequest?: (id: string) => void;
  onEditRequest?: (expense: ExpensesType) => void;
}

export interface DeleteExpenseModalProps {
  openModal: boolean;
  handleClose: () => void;
  expenseId: string | null;
  onExpenseDeleted?: () => void;
}

export interface ExpenseTableProps {
  tableData: ExpensesType[];
  onDeleteRequest?: (id: string) => void;
  onEditRequest?: (expense: ExpensesType) => void;
}

export type InitialExpenseType = {
  status: StatusType;
  error: null | string;
  expenseList: ExpensesType[];
  expenseData: ExpenseDataType;
};
