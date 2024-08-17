import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Box, Stack } from "@mui/material";
import { ExpenseTableProps } from "../types";
import { formatAmount } from "../../../utils";

export default function ExpenseTable({ tableData }: ExpenseTableProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpenseEdit = function () {
    console.log("id");
    handleClose();
  };
  const handleExpenseDelete = function () {
    handleClose();
  };

  return (
    <TableContainer
      sx={{ display: { xs: "none", sm: "block", md: "block", lg: "block" } }}
    >
      <Table
        sx={{
          minWidth: 600,
        }}
        aria-label="a dense table"
      >
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleExpenseEdit}>Edit</MenuItem>
          <MenuItem onClick={handleExpenseDelete}>Delete</MenuItem>
        </Menu>
        <TableHead>
          <TableRow>
            <TableCell align="left">Category</TableCell>
            <TableCell align="center">Sub-Category</TableCell>
            <TableCell align="center">Mode</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row.categoryName}
              </TableCell>
              <TableCell align="center">{row.subCategoryName}</TableCell>
              <TableCell align="center">{row.paymentType}</TableCell>
              <TableCell align="center">{row.expenseDescription}</TableCell>
              <TableCell align="center">
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <CurrencyRupeeIcon fontSize="small" />
                  <Box>{formatAmount(row.expenseAmount)}</Box>
                </Stack>
              </TableCell>
              <TableCell align="center" aria-label="button">
                <IconButton
                  aria-label="left arrow"
                  size="medium"
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
