import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialLoginStatus, UserType } from "../types";
import { fetchLoginStatus } from "../services";

const initialState: InitialLoginStatus = {
  status: "idle",
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLoginStatus.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(
      fetchLoginStatus.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.status = "success";
        state.user = action.payload;
      }
    );
    builder.addCase(fetchLoginStatus.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload as string | null;
    });
  },
  selectors: {
    selectLoadingStatus(state) {
      return state.status;
    },
    selectLoginErrorMessage(state) {
      return state.error;
    },
    selectUser(state) {
      return state.user;
    },
  },
});

export const { logout } = authSlice.actions;

export const { selectLoginErrorMessage, selectLoadingStatus, selectUser } =
  authSlice.selectors;

export default authSlice.reducer;
