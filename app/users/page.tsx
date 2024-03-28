"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/Redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GetUsers, changeName } from "@/Redux/users";
import { useEffect, useState } from "react";

const User = () => {
  const users = useSelector((state: RootState) => state.usersSlice);
  const manager = users.data.payload[0];
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  return (
    <div className=" flex h-full items-center justify-center bg-sky-500 ">
      <div className="bg-white space-y-5 flex max-w-md flex-col items-start shadow-md justify-center p-5 rounded-md">
        <h1>Name:{users.name}</h1>
        {!users.pending && <div>{manager.gender} </div>}
        <Input
          type="name"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button className="w-full" onClick={() => dispatch(changeName(value))}>
          Click ME
        </Button>
      </div>
    </div>
  );
};
export default User;
