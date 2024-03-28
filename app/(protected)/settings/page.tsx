import { auth, signOut } from "@/auth";

import { Button } from "@/components/ui/button";
const Page = async () => {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session)} </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  );
};
export default Page;
