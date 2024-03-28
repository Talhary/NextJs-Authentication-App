"use client";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import { useDispatch } from "react-redux";
import { GetUsers } from "@/Redux/users";
import { useEffect } from "react";
import { GetUsersType } from "./users";
export const Providers = ({ children }: { children: React.ReactNode }) => {
   return <Provider store={store}>{children}</Provider>;
};
