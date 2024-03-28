"use client";
import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  id: string;
  name: string;
  pending?: boolean;
  data: { payload?: any };
};
type createSliceType = {
  name: string;
  initialState: InitialStateType;
};
const initialState = {
  id: "",
  name: "",
  pending: true,
  data: { payload: "" },
} as InitialStateType;
import { createAsyncThunk } from "@reduxjs/toolkit";

const GetUsers = createAsyncThunk("get/users", async () => {
  try {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    return data.results;
  } catch (error) {
    return error;
  }
});
export type GetUsersType = typeof GetUsers;
export { GetUsers };
export const usersSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUsers.pending, (state) => {
        state.pending = true;
      })
      .addCase(GetUsers.fulfilled, (state, { payload }) => {
        state.pending = false;

        state.data = { payload };
      })
      .addCase(GetUsers.rejected, (state) => {
        state.pending = false;
      });
  },
});

export const { changeName } = usersSlice.actions;
export default usersSlice.reducer;
