"use server"
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
  const session = await auth();
 
 console.log("user role ",session?.user.role)
  
  if (!session?.user) return redirect("/login");

 
  return session?.user
}
