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
import CircularProgress from "@mui/material/CircularProgress";
import dayjs, { Dayjs } from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  fetchExpenseCategory,
  fetchExpenseMode,
  fetchExpenseSubCategory,
  saveExpense,
} from "../services";
import {
  AddNewExpenseProps,
  ExpenseCategory,
  ExpenseMode,
  ExpenseSubcategory,
} from "../types";
import { formatAmount } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectAddExpenseLoadingStatus } from "../slices/addExpenseSlice";

const resetForm = () => ({
  category: null as string | null,
  subCategory: null as string | null,
  mode: null as string | null,
  description: "",
  amount: "",
  expenseDate: dayjs(new Date()),
});

export default function AddNewExpense({
  handleClose,
  openModal,
  onExpenseAdded,
  expenseToEdit,
}: AddNewExpenseProps) {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectAddExpenseLoadingStatus);
  const isLoading = loadingStatus === "loading";
  const isEditMode = !!expenseToEdit;
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

    if (!isFormValid || !expenseDate) return;

    const selectedCategory = expenseCategories.find(
      (expense) => expense.name === category,
    );
    const selectedSubCategory = expenseSubCategories.find(
      (sub) => sub.name === subCategory,
    );
    const selectedMode = expenseMode.find(
      (expenseMode) => expenseMode.name === mode,
    );

    const expense = {
      amount: numericAmount,
      description,
      category: selectedCategory?.id,
      subCategory: selectedSubCategory?.id,
      expenseMode: selectedMode?.id,
      expenseDate: expenseDate.format("YYYY-MM-DD"),
    };

    try {
      await dispatch(
        saveExpense({
          expense,
          expenseId: isEditMode ? expenseToEdit.id : undefined,
        }),
      ).unwrap();
      onExpenseAdded?.();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getExpenseCategory();
    getExpenseMode();
  }, []);

  useEffect(() => {
    if (!openModal) return;

    if (expenseToEdit) {
      setCategory(expenseToEdit.categoryName);
      setDescription(expenseToEdit.expenseDescription);
      setMode(expenseToEdit.paymentType);
      setAmount(formatAmount(expenseToEdit.expenseAmount));
      setExpenseDate(dayjs(expenseToEdit.createdAt.split("T")[0]));
      return;
    }

    const defaults = resetForm();
    setCategory(defaults.category);
    setSubCategory(defaults.subCategory);
    setMode(defaults.mode);
    setDescription(defaults.description);
    setAmount(defaults.amount);
    setExpenseDate(defaults.expenseDate);
    setExpenseSubCategories([]);
  }, [openModal, expenseToEdit]);

  useEffect(() => {
    if (!openModal || !category) return;

    const selectedCategory = expenseCategories.find(
      (item) => item.name === category,
    );
    if (selectedCategory) {
      getSubCategory(selectedCategory.id);
    }
  }, [category, expenseCategories, openModal]);

  useEffect(() => {
    if (!openModal || !expenseToEdit || !category) return;
    if (category !== expenseToEdit.categoryName) return;
    if (expenseSubCategories.length === 0) return;

    setSubCategory(expenseToEdit.subCategoryName);
  }, [openModal, expenseToEdit, category, expenseSubCategories]);

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
        {isEditMode ? "Edit Expense" : "Add New Expense"}
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
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={25} />
          ) : isEditMode ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
