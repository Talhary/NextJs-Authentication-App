'use server';
import {auth, signOut } from "@/auth";
export const Logout = async ()=>{
    const session = await auth();
    console.log({session})
    await signOut();
}; 