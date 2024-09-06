import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { ExpenseTableProps } from "../../expenses/types";
import { formatAmount } from "../../../utils";

const ExpenseTable = ({ tableData }: ExpenseTableProps) => {
  return (
    <Card sx={{ rowGap: 2 }}>
      <TableContainer
        sx={{
          display: { xs: "none", sm: "block", md: "block", lg: "block" },
        }}
      >
        <Table
          sx={{
            minWidth: 600,
          }}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Sub-Category</TableCell>
              <TableCell align="center">Mode</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {new Date().toLocaleString("default", {
                    dateStyle: "medium",
                  })}
                  {/* {row.date.toLocaleString("default", {
                    dateStyle: "medium",
                  })} */}
                </TableCell>
                <TableCell align="center">{row.categoryName}</TableCell>
                <TableCell align="center">{row.subCategoryName}</TableCell>
                <TableCell align="center">{row.paymentType}</TableCell>
                <TableCell align="center">{row.expenseDescription}</TableCell>
                <TableCell align="center">
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <CurrencyRupeeIcon fontSize="small" />
                    <Box>{formatAmount(row.expenseAmount)}</Box>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ExpenseTable;
