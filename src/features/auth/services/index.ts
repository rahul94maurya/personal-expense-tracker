import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../data/constants";
import { setAuthToken } from "../../../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDetailsType, SignupDetailsType } from "../types";

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
        `${BASE_URL}/api/auth/signin`,
        loginDetails,
      );
      console.log("response: " + JSON.stringify(response));
      const userData = response.data;
      setAuthToken(userData.accessToken);
      return userData;
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
        `${BASE_URL}/api/auth/signup`,
        signupDetails,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(getAuthErrorMessage(err));
    }
  },
);
