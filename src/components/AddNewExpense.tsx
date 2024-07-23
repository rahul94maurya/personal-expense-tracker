import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { expenseCategory, expenseMode } from "../utilities/constants";
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

interface AddNewExpenseProps {
  handleClose: () => void;
  openModal: boolean;
}
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
    dayjs(new Date())
  );
  const expenseCategoryOptions = expenseCategory.map(
    (expense) => expense.categoryName
  );

  const subCategoryOptions = category
    ? expenseCategory
        .filter((ele) => ele.categoryName === category)[0]
        ?.subCategory.map((subCategory) => subCategory.subCategoryName)
    : [];

  const handleInputAmount = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const input = event.target.value;
    const temp1 = input.split(",").join("");

    console.log("input", typeof +temp1);
    if (+input) {
      const demo = (+temp1).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });
      // setAmount(input);
      setAmount(demo);
    }

    // setAmount(input);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const tempObj = {
      expenseDate,
      category,
      subCategory,
      description,
      mode,
      amount,
    };
    console.log("form object", tempObj, event);
    handleClose();
  };

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
          //   bgcolor: "primary.light",
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
          options={expenseMode}
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
        <Button type="submit" size="large" variant="contained" disabled={false}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
