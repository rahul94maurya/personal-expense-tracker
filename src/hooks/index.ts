import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../store";

export const useAppSelector = useSelector.withTypes<AppStore>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
