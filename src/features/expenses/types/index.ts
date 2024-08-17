export interface ExpensesType {
  id: number;
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
}

export interface ExpenseTableProps {
  tableData: ExpensesType[];
}

export type InitialExpenseType = {
  status: "idle" | "loading" | "success" | "error";
  error: null | string;
  expenseList: ExpensesType[];
  expenseData: ExpenseDataType;
};
