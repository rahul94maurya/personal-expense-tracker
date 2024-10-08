import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { formatAmount } from "../../../utils";
import { ExpensesType } from "../types";

export default function ExpenseCard({
  categoryName,
  expenseAmount,
  expenseDescription,
  subCategoryName,
  paymentType,
  id,
}: ExpensesType) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpenseEdit = function () {
    console.log("id", id);
    handleClose();
  };
  const handleExpenseDelete = function () {
    handleClose();
  };

  return (
    <Card sx={{ maxWidth: 600, display: { xs: "grid", sm: "none" } }}>
      <CardContent>
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
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleExpenseEdit}>Edit</MenuItem>
          <MenuItem onClick={handleExpenseDelete}>Delete</MenuItem>
        </Menu>
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
              {categoryName}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              lineHeight={1}
              fontSize={"13px"}
            >
              ({subCategoryName})
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
                {formatAmount(expenseAmount)}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              component="div"
              lineHeight={1}
              alignSelf={"center"}
              fontSize={"13px"}
            >
              ({paymentType})
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" color="text.secondary">
            {expenseDescription}
          </Typography>
          <CardActions sx={{ alignSelf: "center" }}>
            <IconButton
              aria-label="left arrow"
              size="small"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
}
