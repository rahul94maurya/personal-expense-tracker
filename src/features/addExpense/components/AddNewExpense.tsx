import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import dayjs, { Dayjs } from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  fetchExpenseCategory,
  fetchExpenseMode,
  fetchExpenseSubCategory,
} from "../services";
import {
  AddNewExpenseProps,
  ExpenseCategory,
  ExpenseMode,
  ExpenseSubcategory,
} from "../types";
import { formatAmount } from "../../../utils";
import { EXPENSE_API_BASE_URL } from "../../../data/constants";

export default function AddNewExpense({
  handleClose,
  openModal,
}: AddNewExpenseProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState<Dayjs | null>(
    dayjs(new Date()),
  );
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    [],
  );
  const [expenseSubCategories, setExpenseSubCategories] = useState<
    ExpenseSubcategory[]
  >([]);
  const [expenseMode, setExpenseMode] = useState<ExpenseMode[]>([]);

  const getExpenseCategory = async function () {
    const category = await fetchExpenseCategory();
    setExpenseCategories(category);
  };

  const getSubCategory = async function (categoryId: string) {
    const subCategory = await fetchExpenseSubCategory(categoryId);
    setExpenseSubCategories(subCategory);
  };

  const getExpenseMode = async function () {
    const mode = await fetchExpenseMode();
    setExpenseMode(mode);
  };

  const expenseCategoryOptions = expenseCategories.map(
    (expense) => expense?.name,
  );

  const subCategoryOptions = expenseSubCategories?.map(
    (subCategory) => subCategory?.name,
  );
  const expenseModeOptions = expenseMode?.map((mode) => mode?.name);

  const handleInputAmount = function (
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const rawValue = event.target.value.replace(/,/g, "");
    if (rawValue === "") {
      setAmount("");
      return;
    }
    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue)) return;
    setAmount(formatAmount(numericValue));
  };

  const numericAmount = Number(amount.replace(/,/g, ""));
  const isFormValid =
    !!expenseDate &&
    !!category &&
    !!subCategory &&
    !!mode &&
    amount !== "" &&
    !Number.isNaN(numericAmount) &&
    numericAmount > 0;

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    const selectedCategory = expenseCategories.find(
      (expense) => expense.name === category,
    );
    const selectedSubCategory = expenseSubCategories.find(
      (sub) => sub.name === subCategory,
    );
    const selectedMode = expenseMode.find(
      (expenseMode) => expenseMode.name === mode,
    );

    const dbObject = {
      amount: numericAmount,
      description,
      category: selectedCategory?.id,
      subCategory: selectedSubCategory?.id,
      expenseMode: selectedMode?.id,
      expenseDate: dayjs(expenseDate).toDate(),
    };

    try {
      const response = await fetch(`${EXPENSE_API_BASE_URL}/add-expense`, {
        method: "POST",
        body: JSON.stringify(dbObject),
        headers: { "Content-Type": "application/json" },
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };
  useEffect(() => {
    getExpenseCategory();
    getExpenseMode();
  }, []);

  useEffect(() => {
    if (category) {
      const [selectedCategory] = expenseCategories.filter(
        (ele) => ele.name === category,
      );
      getSubCategory(selectedCategory?.id);
    }
  }, [category, expenseCategories]);

  return (
    <Dialog
      open={openModal}
      fullWidth
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleFormSubmit,
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Add New Expense
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem sx={{ mt: 1 }}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Expense Date"
              value={expenseDate}
              onChange={(newValue) => setExpenseDate(newValue)}
            />
          </DemoItem>
        </LocalizationProvider>
        <Autocomplete
          value={category}
          onChange={(_, newValue: string | null) => {
            setCategory(newValue);
            setSubCategory(null);
          }}
          id="expense category"
          options={expenseCategoryOptions}
          sx={{ width: "full", mt: 1 }}
          renderInput={(params) => (
            <TextField {...params} name="category" label="Expense Category" />
          )}
        />
        <Autocomplete
          value={subCategory}
          disabled={category ? false : true}
          onChange={(_, newValue: string | null) => {
            setSubCategory(newValue);
          }}
          id="expense sub-category"
          options={subCategoryOptions}
          sx={{ width: "full", mt: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Sub-Category" />
          )}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          name="description"
          value={description}
          label="Description (Optional)"
          type="text"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <Autocomplete
          value={mode}
          onChange={(_, newValue: string | null) => {
            setMode(newValue);
          }}
          id="expense Mode"
          options={expenseModeOptions}
          sx={{ width: "full", mt: 1 }}
          renderInput={(params) => <TextField {...params} label="Mode" />}
        />
        <FormControl fullWidth sx={{ mt: "0.7rem" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="text"
            onChange={handleInputAmount}
            value={amount}
            startAdornment={
              <InputAdornment position="start">
                <CurrencyRupeeIcon />
              </InputAdornment>
            }
            label="Amount"
          />
        </FormControl>
      </DialogContent>
      <DialogActions
        sx={{
          gap: 2,
          mb: 2,
          mr: 2,
        }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          size="large"
        >
          Cancel
        </Button>
        <Button type="submit" size="large" variant="contained" disabled={!isFormValid}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
