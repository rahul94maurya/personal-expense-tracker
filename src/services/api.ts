// import { BASE_URL } from "../data/constants";
// import axios, { AxiosError } from "axios";

// import { setAuthToken } from "../utils";
// import { LoginDetailsType } from "../features/auth/types";

// export const fetchLoginStatus = async function (data: LoginDetailsType) {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/auth/signin`, data);
//     const userData = response.data;
//     setAuthToken(userData.accessToken);
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
