import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddNewExpenseModal from "../components/AddNewExpense";
import ExpenseCard from "../components/ExpenseCard";
import {
  Card,
  Divider,
  IconButton,
  // SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { allMonths, data } from "../utilities/constants";

export default function Home() {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleCloseExpenseModal = function () {
    setOpenExpenseModal(false);
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   setMonth(event.target.value as string);
  // };

  const handleNextMonthClick = () => {
    if (selectedMonth < 11) setSelectedMonth((pre) => pre + 1);
  };

  const handlePreviousMonthClick = () => {
    if (selectedMonth > 0) setSelectedMonth((pre) => pre - 1);
  };

  return (
    <Stack>
      <Card sx={{ mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={1.5}
        >
          <IconButton
            aria-label="left arrow"
            size="medium"
            onClick={handlePreviousMonthClick}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Stack direction={"row"} gap={5}>
            <Typography variant="h6">
              {allMonths[selectedMonth]}, {24}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 3, borderColor: "red" }}
            />
            <Typography variant="h6">12,234</Typography>
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
      {data.length === 0 ? (
        <Stack justifyContent="center">
          No expense Found. Please add a expense
        </Stack>
      ) : (
        <ExpenseCard expenseData={data} />
      )}

      {/* */}

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
