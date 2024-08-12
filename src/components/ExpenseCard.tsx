import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import ExpenseTable from "./ExpenseTable";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ExpenseDemo from "./ExpenseDemo";

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
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box>
      {expenseData.map((expense) => (
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
              alignItems="center"
              width={"100%"}
              justifyContent=""
            >
              <Typography
                variant="body1"
                justifySelf={"start"}
                minWidth={"50%"}
              >
                {expense.date}
              </Typography>
              <Typography
                variant="body1"
                justifySelf={"start"}
                minWidth={"50%"}
              >
                {expense.amount}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "grid",
              rowGap: 2,
            }}
          >
            {expense.tableData.map((ele) => (
              <ExpenseDemo key={ele.id} {...ele} />
            ))}
            <ExpenseTable tableData={expense.tableData} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
