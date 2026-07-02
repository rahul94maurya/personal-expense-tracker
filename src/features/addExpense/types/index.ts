export interface AddNewExpenseProps {
  handleClose: () => void;
  openModal: boolean;
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
