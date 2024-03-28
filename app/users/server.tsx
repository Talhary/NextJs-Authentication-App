import { GetUsers } from "@/Redux/users";

const Users = async () => {
  const res = await GetUsers();
  console.log(res);
  return <div>Hi</div>;
};
export default Users;
