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
    const dateKey = new Date(date.createdAt).toISOString().split("T")[0];
    if (result[dateKey]) {
      result[dateKey].push(date);
    } else {
      result[dateKey] = [date];
    }
  });
  return result;
};

export const generateExpenseData = function (expenses: any[]) {
  const expenseData: any = {};
  const totalAmount = expenses.reduce(
    (acc, expense) => acc + expense.expenseAmount,
    0,
  );

  expenseData.totalAmount = totalAmount;

  const referenceDate =
    expenses.length > 0 ? new Date(expenses[0].createdAt) : new Date();

  expenseData.currentMonth = referenceDate.toLocaleString("default", {
    month: "long",
  });
  expenseData.currentYear = referenceDate.toLocaleString("default", {
    year: "numeric",
  });

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
