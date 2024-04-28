"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "../../_components/user-info";

const ClientSession = () => {
  const session = useCurrentUser();
  if (!session) {
    return <>User Not found</>;
  }
  return (
    <div>
      <UserInfo user={session} label="Client Component" />
    </div>
  );
};
export default ClientSession;
