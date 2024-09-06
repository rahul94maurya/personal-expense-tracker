import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectExpenseList,
  selectLoadingStatus,
} from "../features/expenses/slices/expenseSlice";
import ExpenseCard from "../features/reports/components/ExpenseCard";
import ExpenseTable from "../features/reports/components/ExpenseTable";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import { fetchExpenseList } from "../features/expenses/services";
import CircularProgress from "@mui/material/CircularProgress";
import Filters from "../features/reports/components/Filters";

const Analysis = () => {
  const dispatch = useAppDispatch();
  const expenseList = useAppSelector(selectExpenseList);
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };
  useEffect(() => {
    if (expenseList.length === 0) dispatch(fetchExpenseList());
  }, [dispatch, expenseList]);

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
    <Box display={"grid"} rowGap={2}>
      {expenseList.map((ele) => (
        <ExpenseCard key={ele.id} {...ele} />
      ))}
      <ExpenseTable tableData={expenseList} />
      <Tooltip title="Filter" arrow>
        <Fab
          onClick={() => {
            setOpenFilterModal(true);
          }}
          color="secondary"
          aria-label="Filter"
          sx={{
            position: "fixed",
            bottom: "3rem",
            right: "3rem",
          }}
        >
          <FilterAltIcon fontSize="large" />
        </Fab>
      </Tooltip>
      {openFilterModal && (
        <Filters
          openModal={openFilterModal}
          handleClose={handleCloseFilterModal}
        />
      )}
    </Box>
  );
};

export default Analysis;
