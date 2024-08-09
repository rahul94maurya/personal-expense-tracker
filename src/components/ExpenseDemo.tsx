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
              sx={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.125 }}
            >
              {props.category}
            </Typography>
            <Typography variant="body2" component="div" lineHeight={1}>
              ({props.subCategory})
            </Typography>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems={"center"}>
              <CurrencyRupeeIcon fontSize="small" />
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "18px", fontWeight: 500 }}
                component="div"
              >
                {new Intl.NumberFormat("en-IN").format(+props.amount)}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              component="div"
              lineHeight={1}
              alignSelf={"center"}
            >
              ({props.mode})
            </Typography>
          </Stack>
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
