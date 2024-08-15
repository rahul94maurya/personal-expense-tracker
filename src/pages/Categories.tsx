import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categoryData } from "../utilities/constants";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import CommentIcon from "@mui/icons-material/Comment";
// import IconButton from "@mui/material/IconButton";

// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// import ExpenseDemo from "../components/ExpenseDemo";
// import Chip from "@mui/material/Chip";

const Categories = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log("event", event);
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box>
      {categoryData.map((category) => (
        <Accordion
          key={category.id}
          expanded={expanded === category.id}
          onChange={handleChange(category.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Stack
              direction="row"
              //   spacing={1}
              alignItems="center"
              //   bgcolor="skyblue"
              width={"100%"}
              justifyContent=""
            >
              <Typography
                variant="body1"
                justifySelf={"start"}
                // bgcolor={"pink"}
                minWidth={"50%"}
              >
                {category.categoryName}
              </Typography>
              {/* <Typography
                variant="body1"
                justifySelf={"start"}
                // bgcolor={"pink"}
                minWidth={"50%"}
              >
                {expense.amount}
              </Typography> */}

              {/* <Chip label={expense.amount} color="secondary" /> */}
            </Stack>
            {/* <Typography variant="body1">{expense.Title}</Typography> */}
            {/* <Typography variant="body1">{expense.Title}</Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ display: "grid", rowGap: 2 }}>
            {/* <ExpenseTable tableData={expense.tableData} /> */}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Categories;
