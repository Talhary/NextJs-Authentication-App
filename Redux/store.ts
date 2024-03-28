"use client";
import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "@/Redux/users";






export const store = configureStore({
  reducer: { usersSlice: usersSlice.reducer },
   
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
