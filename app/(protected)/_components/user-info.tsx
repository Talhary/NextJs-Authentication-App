import { ExtendedUser } from "@/next-auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { boolean } from "zod";
type UserInfoProps = {
  user: ExtendedUser;
  label: string;
};
export const UserInfo = ({ user, label }: UserInfoProps) => {
  interface UserData {
    title: string;
    name: string | number | boolean | undefined | null;
  }
  const data: UserData[] = [
    { title: "Profile Name", name: user.name },
    { title: "User Email", name: user.email },
    { title: "ID", name: user.id },

    { title: "ROLE", name: user.role },
    { title: "Two Factor", name: user.isTwoFactorEnabled },
  ];
  // user.isTwoFactorEnabled = false;
  return (
    <Card className="p-4 max-w-md mx-auto ">
      <CardTitle>{label}</CardTitle>
      <CardHeader>
        <h2 className="text-xl font-semibold">{user?.name}</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        {data.map((el, i) => {
          return (
            <div
              key={i}
              className="border p-2 flex-row flex justify-between rounded-md"
            >
              <h3 className="">{el.title}</h3>
              <p className="bg-gray-100 inline rounded-md p-[2px] text-sm">
                {el.name}
              </p>
              {typeof el.name == "boolean" ? (
                <div
                  className={
                    el.name
                      ? "bg-cyan-300 p-[2px] rounded-md "
                      : "p-[2px] bg-red-600 rounded-md text-white"
                  }
                >
                  {el.name ? "On" : "Off"}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
