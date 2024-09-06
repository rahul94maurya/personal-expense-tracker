import React, { useEffect, useState } from "react";
import {
  AddNewExpenseProps,
  ExpenseCategory,
  ExpenseMode,
  ExpenseSubcategory,
} from "../../addExpense/types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Autocomplete from "@mui/material/Autocomplete";
import {
  fetchExpenseCategory,
  fetchExpenseMode,
  fetchExpenseSubCategory,
} from "../../addExpense/services";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Filters = ({ handleClose, openModal }: AddNewExpenseProps) => {
  const [category, setCategory] = useState<string | null>("All");
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  //   const [amount, setAmount] = useState("");

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [expenseSubCategories, setExpenseSubCategories] = useState<
    ExpenseSubcategory[]
  >([]);
  const [expenseMode, setExpenseMode] = useState<ExpenseMode[]>([]);

  const getExpenseCategory = async function () {
    const category = await fetchExpenseCategory();
    setExpenseCategories(category);
  };

  const getSubCategory = async function (categoryId: number) {
    const subCategory = await fetchExpenseSubCategory(categoryId);
    setExpenseSubCategories(subCategory);
  };

  const getExpenseMode = async function () {
    const mode = await fetchExpenseMode();
    setExpenseMode(mode);
  };

  const expenseCategoryOptions = expenseCategories.map(
    (expense) => expense?.name
  );

  const subCategoryOptions = expenseSubCategories?.map(
    (subCategory) => subCategory?.name
  );
  const expenseModeOptions = expenseMode?.map((mode) => mode?.type);
  expenseCategoryOptions.push("All");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // {
    //     "amount":10,
    //     "expenseDescription":"TV Repairing",
    //     "paymentId":1,
    //     "categoryId":5,
    //     "subCategoryId":1,
    // }

    console.log("form object");
    handleClose();
  };
  useEffect(() => {
    getExpenseCategory();
    getExpenseMode();
  }, []);

  useEffect(() => {
    if (category) {
      const [selectedCategory] = expenseCategories.filter(
        (ele) => ele.name === category
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
        Filter Your Expense
      </DialogTitle>
      <DialogContent>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem sx={{ mt: 1 }}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Expense Date"
              value={expenseDate}
              onChange={(newValue) => setExpenseDate(newValue)}
            />
          </DemoItem>
        </LocalizationProvider> */}
        <Autocomplete
          value={category}
          onChange={(_, newValue: string | null) => {
            setCategory(newValue);
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
        {/* <FormControl fullWidth sx={{ mt: "0.7rem" }}>
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
        </FormControl> */}
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
        <Button type="submit" size="large" variant="contained" disabled={false}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Filters;
