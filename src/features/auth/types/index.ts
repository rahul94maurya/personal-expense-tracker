import { StatusType } from "../../../types";

export interface UserType {
  userId: string;
  name: string;
  email: string;
  accessToken: string;
}

export interface InitialLoginStatus {
  status: StatusType;
  error: null | string;
  user: UserType | null;
}

export type LoginDetailsType = {
  email: string;
  password: string;
};

export type SignupDetailsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupResponseType = {
  message: string;
};
