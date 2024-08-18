import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { AddNewExpenseModal } from "../features/addExpense";
import Expenses from "../features/expenses/components/Expenses";
import { Card, Divider, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formatAmount } from "../utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectExpenseData,
  selectLoadingStatus,
  // selectErrorMessage,
} from "../features/expenses/slices/expenseSlice";
import { fetchExpenseList } from "../features/expenses/services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const expenseData = useAppSelector(selectExpenseData);
  // const error = useAppSelector(selectErrorMessage);
  const dispatch = useAppDispatch();
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  // const isMobileView = useMediaQuery("(max-width:600px)");

  const handleCloseExpenseModal = function () {
    setOpenExpenseModal(false);
  };

  const handleNextMonthClick = () => {
    if (selectedMonth < 11) setSelectedMonth((pre) => pre + 1);
  };

  const handlePreviousMonthClick = () => {
    if (selectedMonth > 0) setSelectedMonth((pre) => pre - 1);
  };

  useEffect(() => {
    dispatch(fetchExpenseList());
  }, []);

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
        <CircularProgress size={70} />
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
            <Typography variant="h6">
              {formatAmount(expenseData?.totalAmount as number)}
            </Typography>
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
      <Expenses expenseData={expenseData?.dayWiseExpense ?? []} />

      <Tooltip title="Add new Expense" arrow>
        <Fab
          onClick={() => {
            setOpenExpenseModal(true);
          }}
          color="secondary"
          aria-label="Add new Expense"
          sx={{
            position: "fixed",
            bottom: "3rem",
            right: "3rem",
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {openExpenseModal && (
        <AddNewExpenseModal
          openModal={openExpenseModal}
          handleClose={handleCloseExpenseModal}
        />
      )}
    </Stack>
  );
}
