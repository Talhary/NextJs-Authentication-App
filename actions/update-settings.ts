'use server';

import { settingsSchema } from "@/Schemas";
import * as z from "zod";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
const SettingsUpdate= async(values: z.infer< typeof settingsSchema>) =>{
  const user = await currentUser();
  if(!user){
    return { error:'No user found'}
  }
  const userFromDb = await getUserById(user.id)
  if(!userFromDb){
    return { error:'No user found'}
  }
  await db.user.update({
    where:{
        id:user.id
    },
    data:{
        ...values
    }
    
  })
   return {success:'Updated Successfully'}

}
export default SettingsUpdate