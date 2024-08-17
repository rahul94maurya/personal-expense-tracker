import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../data/constants";
import { getAuthStatus } from "../../../utils";

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
