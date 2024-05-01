import { currentUser } from "@/lib/auth";
import { UserInfo } from "../../_components/user-info";
const Server = async () => {
  const user = await currentUser();
  if (!user) {
    return <>Sorry User doesnt exist</>;
  }
  return (
    <>
      <div>
        <UserInfo user={user} label="Server Component" />
      </div>
    </>
  );
};
export default Server;
