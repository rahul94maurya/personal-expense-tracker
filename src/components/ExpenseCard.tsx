import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ExpenseTable from "./ExpenseTable";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// import Chip from "@mui/material/Chip";

interface ExpenseCardProps {
  expenseData: {
    id: number;
    date: string;
    amount: string | number;
    tableData: {
      id: number;
      category: string;
      subCategory: string;
      mode: string;
      description: string;
      amount: number;
    }[];
  }[];
}

export default function ExpenseCard({ expenseData }: ExpenseCardProps) {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box>
      {expenseData.map((expense) => (
        // <ExpenseTable tableData={expense.tableData} />
        <Accordion
          key={expense.id}
          expanded={expanded === expense.id}
          onChange={handleChange(expense.id)}
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
                {expense.date}
              </Typography>
              <Typography
                variant="body1"
                justifySelf={"start"}
                // bgcolor={"pink"}
                minWidth={"50%"}
              >
                {expense.amount}
              </Typography>

              {/* <Chip label={expense.amount} color="secondary" /> */}
            </Stack>
            {/* <Typography variant="body1">{expense.Title}</Typography> */}
            {/* <Typography variant="body1">{expense.Title}</Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            <ExpenseTable tableData={expense.tableData} />
          </AccordionDetails>
        </Accordion>
      ))}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion> */}
    </Box>
  );
}
