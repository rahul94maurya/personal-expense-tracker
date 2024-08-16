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
              {expenseTableData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.date.toLocaleString("default", {
                      dateStyle: "medium",
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
          }}
        >
          <Stack gap={0.5}>
            <Typography
              component="div"
              variant="h6"
              sx={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.125,
                mb: 1.5,
              }}
            >
              {new Date().toLocaleString("default", {
                dateStyle: "medium",
              })}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={1}
          >
            <Stack gap={0.5}>
              <Typography
                component="div"
                variant="subtitle2"
                sx={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.125 }}
              >
                Lorem ipsum dolor sit.
              </Typography>
              <Typography variant="body2" component="div" lineHeight={1}>
                (lorem5 amet, and )
              </Typography>
            </Stack>
            <Stack minWidth={100}>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <CurrencyRupeeIcon fontSize="small" />
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                  component="div"
                >
                  {new Intl.NumberFormat("en-IN").format(12121.45)}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                component="div"
                lineHeight={1}
                alignSelf={"center"}
                fontSize={"13px"}
              >
                (Bank transfer)
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Lorem ipsum Lorem ipsum dolor sit a.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Analysis;
