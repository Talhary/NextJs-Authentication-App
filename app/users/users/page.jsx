'use client'
import { GetUsers } from "@/Redux/users";
import { useDispatch } from "react-redux";
const Users = async () => {
const dispatch = useDispatch();
let user = null;
 const res = await dispatch(GetUsers());
  user = res.payload[0];
  console.log(user);
  return (
    <div className="flex space-y-5 flex-col justify-center items-center">
      <div>{user.gender}</div>
      <div>{user.name} </div>;
    </div>
  );
};
export default Users;
