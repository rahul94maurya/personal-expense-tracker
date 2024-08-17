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
// import useMediaQuery from "@mui/material/useMediaQuery";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { DayExpense } from "../types";

interface ExpenseCardProps {
  expenseData: DayExpense[];
}

export default function ExpenseCard({ expenseData }: ExpenseCardProps) {
  // const isMobileView = useMediaQuery("(max-width:600px)");

  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box>
      {expenseData?.map((expense) => (
        <Accordion
          key={expense.id}
          expanded={expanded === +expense.id}
          onChange={handleChange(+expense.id)}
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
                {new Date(expense.date).toLocaleString("default", {
                  dateStyle: "medium",
                })}
              </Typography>
              <Stack direction="row" alignItems={"center"}>
                <CurrencyRupeeIcon fontSize="small" />
                <Typography
                  variant="body1"
                  justifySelf={"start"}
                  minWidth={"50%"}
                >
                  {new Intl.NumberFormat("en-IN").format(
                    expense.totalExpenseOfTheDay
                  )}
                </Typography>
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "grid",
              rowGap: 2,
            }}
          >
            {expense.expenses.map((ele) => (
              <ExpenseDemo key={ele.id} {...ele} />
            ))}
            <ExpenseTable tableData={expense.expenses} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
