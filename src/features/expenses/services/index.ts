import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../data/constants";
import { getAuthStatus } from "../../../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpenseList = createAsyncThunk(
  "expenses/fetchExpenseList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/expense`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthStatus(),
        },
      });
      const expenseList = response.data;
      return expenseList;
    } catch (err) {
      const error = err as AxiosError;
      // used this AxiosError type to get the TS support
      if (error.response) {
        // when working with AXIOS we get this response key when we get an error
        // but if internet is not available then we don't get this response key
        if (error.response.status === 401) {
          //handle different error response based on status code
          return rejectWithValue(
            (error.response.data as { message: string }).message
          );
        }
        if (error.response.status === 404) {
          // This errorcode is used when the API endpoint is not available
          // or we have entered an invalid API Endpoint
          return rejectWithValue(
            (error.response.data as { message: string }).message ||
              error.response.data
          );
        }
        // used this below return statement for all other error code which are
        // not handled by above if block
        return rejectWithValue(
          (error.response.data as { message: string }).message
        );
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const fetchExpenseList = async function () {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/expense`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + getAuthStatus(),
//       },
//     });
//     const userData = response.data;
//     return userData;
//   } catch (err) {
//     const error = err as AxiosError;
//     if (error.response) {
//       // when working with AXIOS we get this response key when we get an error from backend server
//       // but if internet is not available then we don't get this response key
//       if (error.response.status === 401) {
//         //handle different error response based on status code
//         // return thunkAPI.rejectWithValue(
//         //   (error.response.data as { message: string }).message
//         // );
//       }
//       if (error.response.status === 404) {
//         // it is used when the API endpoint is not available or we have entered an invalid API Endpoint
//         // return thunkAPI.rejectWithValue(
//         //   (error.response.data as { message: string }).message ||
//         //     error.response.data
//         // );
//       }
//       const errors = (error.response.data as { message: string }).message;
//       return errors;
//       console.log("error from backend server", errors);
//     } else {
//       // this else block will executed when we have no internet
//       const errors = error.message;
//       return errors;
//       console.log("error when no internet", errors);
//     }
//   }
// };
