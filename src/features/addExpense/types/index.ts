export interface AddNewExpenseProps {
  handleClose: () => void;
  openModal: boolean;
}

export interface ExpenseSubcategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface ExpenseCategory extends ExpenseSubcategory {
  userId: number;
}
export interface ExpenseMode {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}
