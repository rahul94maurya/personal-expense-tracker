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
// const fetchData = function () {
//   try {
//     const response = await axios.get("https://dummyjson.com/http/408");
//     return response.data;
//   } catch (err) {
//     const error = err as AxiosError;
//     if (error.response) {
//       // when working with AXIOS we get this response key when we get an error from backend server
//       // but if internet is not available then we don't get this response key
//       if (error.response.status === 401) {
//         //handle different error response based on status code
//         return thunkAPI.rejectWithValue(
//           (error.response.data as { message: string }).message
//         );
//       }
//       if (error.response.status === 404) {
//         // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
//         return thunkAPI.rejectWithValue(
//           (error.response.data as { message: string }).message ||
//             error.response.data
//         );
//       }
//       return thunkAPI.rejectWithValue(
//         (error.response.data as { message: string }).message
//       );
//     } else {
//       // this else block will executed when we have no internet
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// };

// const allMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
export default function Home() {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const handleCloseExpenseModal = function () {
    setOpenExpenseModal(false);
  };
  const [month, setMonth] = useState("July");
  // const handleChange = (event: SelectChangeEvent) => {
  //   setMonth(event.target.value as string);
  // };
  return (
    <Stack>
      <Card sx={{ mb: 2, width: "100%" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1.5}
        >
          <IconButton aria-label="delete" size="medium">
            <ArrowBackIosIcon />
          </IconButton>
          <Stack direction={"row"} gap={5}>
            <Typography variant="h6">{month}, 2024</Typography>
            {/* <Chip label="Amount : 12,234" color="success"> */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 3, borderColor: "red" }}
            />
            <Typography variant="h6">Total : 12,234</Typography>
          </Stack>
          <IconButton aria-label="delete" size="medium">
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
        {/* <CardContent></CardContent> */}
      </Card>

      <ExpenseCard />

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
