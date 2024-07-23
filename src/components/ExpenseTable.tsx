import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";

interface tableDataProps {
  id: number;
  category: string;
  subCategory: string;
  mode: string;
  description: string;
  amount: number;
}
interface ExpenseTableProps {
  tableData: tableDataProps[];
}

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function ExpenseTable({ tableData }: ExpenseTableProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                {row.category}
              </TableCell>
              <TableCell align="center">{row.subCategory}</TableCell>
              <TableCell align="center">{row.mode}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center" aria-label="button">
                <EditIcon sx={{ cursor: "pointer" }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
