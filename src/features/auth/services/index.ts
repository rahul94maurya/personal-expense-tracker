import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../data/constants";
import { setAuthToken } from "../../../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDetailsType, SignupDetailsType } from "../types";
import { EXPENSE_API_BASE_URL } from "../../../data/constants";

const getAuthErrorMessage = (err: unknown) => {
  const error = err as AxiosError;
  if (error.response) {
    if (error.response.status === 401) {
      return (error.response.data as { message: string }).message;
    }
    if (error.response.status === 404) {
      return (
        (error.response.data as { message: string }).message ||
        (error.response.data as string)
      );
    }
    return (error.response.data as { message: string }).message;
  }
  return error.message;
};

export const fetchLoginStatus = createAsyncThunk(
  "auth/fetchLoginStatus",
  async (loginDetails: LoginDetailsType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${EXPENSE_API_BASE_URL}/auth/login`,
        loginDetails,
      );
      console.log("response: " + JSON.stringify(response));
      const userData = response.data;
      setAuthToken(userData.data.accessToken);
      return userData.data;
    } catch (err) {
      return rejectWithValue(getAuthErrorMessage(err));
    }
  },
);

export const fetchSignupStatus = createAsyncThunk(
  "auth/fetchSignupStatus",
  async (signupDetails: SignupDetailsType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${EXPENSE_API_BASE_URL}/auth/signup`,
        signupDetails,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(getAuthErrorMessage(err));
    }
  },
);
