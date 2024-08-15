import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { expenseTableData } from "../utilities/constants";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Analysis = () => {
  return (
    <>
      <Card>
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
              {expenseTableData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.date.toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.subCategory}</TableCell>
                  <TableCell align="center">{row.mode}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    <Stack direction={"row"} alignItems={"center"}>
                      <CurrencyRupeeIcon fontSize="small" />
                      <Box>{row.amount}</Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardContent
          sx={{
            maxWidth: 600,
            display: { xs: "grid", sm: "none" },
            rowGap: 2,
          }}
        >
          <Stack gap={0.5}>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.125 }}
            >
              {new Date().toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </Typography>
          </Stack>

          <Stack direction={"row"}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "18px", fontWeight: 500 }}
              component="div"
            >
              Home
            </Typography>

            <Typography
              variant="body2"
              component="div"
              lineHeight={1}
              alignSelf={"center"}
            >
              (T.V/Fridge/A.C/washing machin)
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Stack direction="row" alignItems={"center"}>
              <CurrencyRupeeIcon fontSize="small" />
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "18px", fontWeight: 500 }}
                component="div"
              >
                {new Intl.NumberFormat("en-IN").format(1241212)}
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              component="div"
              lineHeight={1}
              alignSelf={"center"}
            >
              (Online payment and others)
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="text.secondary">
              this is description
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default Analysis;
