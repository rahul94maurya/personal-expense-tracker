// import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function ExpenseDemo(props: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        {/* <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          mb={1.125}
        >
          <Stack>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.125 }}
            >
              {props.category}
            </Typography>
            <Typography variant="body2" component="div" lineHeight={1}>
              ({props.subCategory})
            </Typography>
          </Stack>
          <Stack alignItems="flex-end">
            <Stack direction="row" alignItems="center">
              <CurrencyRupeeIcon fontSize="small" />
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "18px", fontWeight: 500 }}
                component="div"
              >
                {props.amount}
              </Typography>
            </Stack>
            <Typography variant="body2" component="div" lineHeight={1}>
              ({props.mode})
            </Typography>
          </Stack>
        </Stack> */}
        <Stack direction="row" justifyContent="space-between" mb={0.25}>
          <Typography
            component="div"
            sx={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.125 }}
          >
            {props.category}
          </Typography>
          <Stack direction="row" alignItems="center">
            <CurrencyRupeeIcon fontSize="small" />
            <Typography
              component="div"
              sx={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.125 }}
            >
              {props.amount}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" direction="row">
          <Typography
            variant="body2"
            sx={{ fontSize: "13px", lineHeight: 1.2 }}
            component="div"
          >
            ({props.subCategory})
          </Typography>
          <Typography
            component="div"
            variant="body2"
            justifySelf={"end"}
            sx={{ fontSize: "13px", lineHeight: 1.2 }}
          >
            ({props.mode})
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <CardActions sx={{ alignSelf: "center" }}>
            <IconButton
              aria-label="left arrow"
              size="small"
              onClick={() => {
                console.log("edit button clicked");
              }}
            >
              {/* <MoreVertIcon /> */}
              <EditIcon />
            </IconButton>
            {/* <IconButton
              aria-label="left arrow"
              size="medium"
              onClick={() => {
                console.log("edit button clicked");
              }}
            >
              <DeleteOutlineIcon />
            </IconButton> */}
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
}
