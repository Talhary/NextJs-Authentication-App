'use client';
import {useSession, signIn, signOut} from 'next-auth/react'
import { Button } from "@/components/ui/button";
const Page =  () => {
  const session = useSession();
  return (
    <>
      <div>{JSON.stringify(session)} </div>
      <form  
      >
        <Button type="submit" onClick={()=>{
          signOut()
        }}>Sign Out</Button>
      </form>
    </>
  );
};
export default Page;
