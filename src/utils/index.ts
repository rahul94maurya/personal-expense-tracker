export const getAuthStatus = function () {
  return localStorage.getItem("authToken");
};

export const setAuthToken = function (token: string) {
  localStorage.setItem("authToken", token);
};

export const removeAuthToken = function () {
  localStorage.removeItem("authToken");
};

export const groupDuplicateDates = function (dates: any) {
  const result: any = {};

  dates.forEach((date: any) => {
    if (result[date.createdAt]) {
      result[date.createdAt].push(date);
    } else {
      result[date.createdAt] = [date];
    }
  });
  return result;
};

export const generateExpenseData = function (expenses: any[]) {
  const expenseData: any = {};
  const totalAmount = expenses.reduce(
    (acc, expense) => acc + expense.expenseAmount,
    0
  );

  expenseData.totalAmount = totalAmount;

  const [currentMonth, currentYear] = new Date(expenses[0].createdAt)
    .toLocaleString("default", { month: "short", year: "2-digit" })
    .split(" ");

  expenseData.currentMonth = currentMonth;
  expenseData.currentYear = currentYear;

  const groupedData = groupDuplicateDates(expenses);
  const dayWiseExpense: any = [];
  for (const key in groupedData) {
    const expense: any = {};
    expense.id = Math.random();
    expense.date = key;
    expense.expenses = groupedData[key];
    expense.totalExpenseOfTheDay = expense.expenses.reduce(
      (acc: number, expense: any) => acc + expense.expenseAmount,
      0
    );
    dayWiseExpense.push(expense);
  }
  expenseData.dayWiseExpense = dayWiseExpense;
  return expenseData;
};

export const formatAmount = function (amount: number) {
  return new Intl.NumberFormat("en-IN").format(amount);
};
