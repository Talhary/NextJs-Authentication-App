import { GetUsers } from "@/Redux/users";

const Users = async () => {
  const res = await GetUsers();
 
  return <div>Hi</div>;
};
export default Users;
