import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";
import { LoginDetail } from "./types";
import { Expenses } from "../pages/Home";

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

export const generateExpenseData = function (expenses: Expenses[]) {
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

export const fetchLoginStatus = async function (data: LoginDetail) {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, data);
    const userData = response.data;
    setAuthToken(userData.accessToken);
    return userData;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // when working with AXIOS we get this response key when we get an error from backend server
      // but if internet is not available then we don't get this response key
      if (error.response.status === 401) {
        //handle different error response based on status code
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message
        // );
      }
      if (error.response.status === 404) {
        // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message ||
        //     error.response.data
        // );
      }
      const errors = (error.response.data as { message: string }).message;
      return errors;
      console.log("error from backend server", errors);
    } else {
      // this else block will executed when we have no internet
      const errors = error.message;
      return errors;
      console.log("error when no internet", errors);
    }
  }
};

export const fetchExpenseCategory = async function () {
  try {
    const response = await axios.get(`${BASE_URL}/api/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthStatus(),
      },
    });
    const userData = response.data;
    return userData;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // when working with AXIOS we get this response key when we get an error from backend server
      // but if internet is not available then we don't get this response key
      if (error.response.status === 401) {
        //handle different error response based on status code
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message
        // );
      }
      if (error.response.status === 404) {
        // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message ||
        //     error.response.data
        // );
      }
      const errors = (error.response.data as { message: string }).message;
      return errors;
      console.log("error from backend server", errors);
    } else {
      // this else block will executed when we have no internet
      const errors = error.message;
      return errors;
      console.log("error when no internet", errors);
    }
  }
};

export const fetchExpenseSubCategory = async function (id: number) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/subcategory?categoryId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthStatus(),
        },
      }
    );
    const userData = response.data;
    return userData;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // when working with AXIOS we get this response key when we get an error from backend server
      // but if internet is not available then we don't get this response key
      if (error.response.status === 401) {
        //handle different error response based on status code
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message
        // );
      }
      if (error.response.status === 404) {
        // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message ||
        //     error.response.data
        // );
      }
      const errors = (error.response.data as { message: string }).message;
      return errors;
      console.log("error from backend server", errors);
    } else {
      // this else block will executed when we have no internet
      const errors = error.message;
      return errors;
      console.log("error when no internet", errors);
    }
  }
};

export const fetchExpenseMode = async function () {
  try {
    const response = await axios.get(`${BASE_URL}/api/paymenttype`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthStatus(),
      },
    });
    const userData = response.data;
    return userData;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // when working with AXIOS we get this response key when we get an error from backend server
      // but if internet is not available then we don't get this response key
      if (error.response.status === 401) {
        //handle different error response based on status code
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message
        // );
      }
      if (error.response.status === 404) {
        // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message ||
        //     error.response.data
        // );
      }
      const errors = (error.response.data as { message: string }).message;
      return errors;
      console.log("error from backend server", errors);
    } else {
      // this else block will executed when we have no internet
      const errors = error.message;
      return errors;
      console.log("error when no internet", errors);
    }
  }
};

export const fetchExpenseList = async function () {
  try {
    const response = await axios.get(`${BASE_URL}/api/expense`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthStatus(),
      },
    });
    const userData = response.data;
    return userData;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      // when working with AXIOS we get this response key when we get an error from backend server
      // but if internet is not available then we don't get this response key
      if (error.response.status === 401) {
        //handle different error response based on status code
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message
        // );
      }
      if (error.response.status === 404) {
        // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
        // return thunkAPI.rejectWithValue(
        //   (error.response.data as { message: string }).message ||
        //     error.response.data
        // );
      }
      const errors = (error.response.data as { message: string }).message;
      return errors;
      console.log("error from backend server", errors);
    } else {
      // this else block will executed when we have no internet
      const errors = error.message;
      return errors;
      console.log("error when no internet", errors);
    }
  }
};
