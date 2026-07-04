import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { AddNewExpenseModal } from "../features/addExpense";
import Expenses from "../features/expenses/components/Expenses";
import DeleteExpenseModal from "../features/expenses/components/DeleteExpenseModal";
import { Card, Divider, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { formatAmount } from "../utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectExpenseData,
  selectLoadingStatus,
} from "../features/expenses/slices/expenseSlice";
import { fetchExpenseList } from "../features/expenses/services";
import { ExpensesType } from "../features/expenses/types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const expenseData = useAppSelector(selectExpenseData);
  // const error = useAppSelector(selectErrorMessage);
  const dispatch = useAppDispatch();
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpensesType | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  // const isMobileView = useMediaQuery("(max-width:600px)");

  const handleCloseExpenseModal = function () {
    setOpenExpenseModal(false);
    setExpenseToEdit(null);
  };

  const handleEditRequest = (expense: ExpensesType) => {
    setExpenseToEdit(expense);
    setOpenExpenseModal(true);
  };

  const handleOpenAddExpenseModal = () => {
    setExpenseToEdit(null);
    setOpenExpenseModal(true);
  };

  const handleDeleteRequest = (id: string) => {
    setExpenseToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setExpenseToDelete(null);
  };

  const handleNextMonthClick = () => {
    if (selectedMonth < 11) setSelectedMonth((pre) => pre + 1);
  };

  const handlePreviousMonthClick = () => {
    if (selectedMonth > 0) setSelectedMonth((pre) => pre - 1);
  };

  useEffect(() => {
    dispatch(fetchExpenseList());
  }, [dispatch]);

  if (loadingStatus === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Stack>
      <Card sx={{ mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <IconButton
            aria-label="left arrow"
            size="medium"
            onClick={handlePreviousMonthClick}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Stack direction={"row"} gap={5} alignItems={"center"}>
            <Typography variant="h6">
              {/* {allMonths[selectedMonth]}, {24} */}
              {expenseData?.currentMonth}, {expenseData?.currentYear}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 3, borderColor: "secondary.main" }}
            />
            <Stack direction="row" alignItems="center" gap={0.5}>
              <CurrencyRupeeIcon />
              <Typography variant="h6">
                {formatAmount(expenseData?.totalAmount as number)}
              </Typography>
            </Stack>
          </Stack>
          <IconButton
            aria-label="Right arrow"
            size="medium"
            onClick={handleNextMonthClick}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Card>
      {!expenseData?.dayWiseExpense ? (
        <Stack justifyContent="center">
          No expense Found. Please add a expense
        </Stack>
      ) : (
        <></>
      )}
      <Expenses
        expenseData={expenseData?.dayWiseExpense ?? []}
        onDeleteRequest={handleDeleteRequest}
        onEditRequest={handleEditRequest}
      />

      <Tooltip title="Add new Expense" arrow>
        <Fab
          onClick={handleOpenAddExpenseModal}
          color="secondary"
          aria-label="Add new Expense"
          sx={{
            position: "fixed",
            bottom: "3rem",
            right: "3rem",
          }}
        >
          <AddIcon fontSize="large" />
        </Fab>
      </Tooltip>
      {openExpenseModal && (
        <AddNewExpenseModal
          openModal={openExpenseModal}
          handleClose={handleCloseExpenseModal}
          expenseToEdit={expenseToEdit}
          onExpenseAdded={() => dispatch(fetchExpenseList())}
        />
      )}
      {openDeleteModal && (
        <DeleteExpenseModal
          openModal={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          expenseId={expenseToDelete}
          onExpenseDeleted={() => dispatch(fetchExpenseList())}
        />
      )}
    </Stack>
  );
}
