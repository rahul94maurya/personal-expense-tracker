import { StatusType } from "../../../types";

export interface UserType {
  id: string;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}

export interface InitialLoginStatus {
  status: StatusType;
  error: null | string;
  user: UserType | null;
}

export type LoginDetailsType = {
  username: string;
  password: string;
};
