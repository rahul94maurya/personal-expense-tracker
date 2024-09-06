import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { formatAmount } from "../../../utils";

const ExpenseCard = () => {
  return (
    <Card
      sx={{ rowGap: 2, maxWidth: 600, display: { xs: "grid", sm: "none" } }}
    >
      <CardContent>
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
            <Typography
              variant="body2"
              component="div"
              lineHeight={1}
              fontSize={"13px"}
            >
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
                {formatAmount(12124.78)}
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
  );
};

export default ExpenseCard;
