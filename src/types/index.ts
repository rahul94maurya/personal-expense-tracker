export type LoginDetail = {
  username: string;
  password: string;
};
export interface Expenses {
  id: number;
  expenseAmount: number;
  expenseDescription: string;
  categoryName: string;
  subCategoryName: string;
  paymentType: string;
  createdAt: string;
  updatedAt: string;
}

export interface DayExpense {
  date: string;
  id: string;
  totalExpenseOfTheDay: number;
  expenses: Expenses[];
}
export interface ExpenseData {
  currentMonth: string;
  currentYear: string;
  totalAmount: number;
  dayWiseExpense: DayExpense[];
}
