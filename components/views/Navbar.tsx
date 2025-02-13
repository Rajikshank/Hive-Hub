import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import {   buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth,   } from "@/utils/auth";
import { UserDropDown } from "./UserDropDown";
export async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between py-5">
      <Link className="flex items-center gap-2" href="/">

 
        <Image src={Logo} alt="Logo" width={40} className="rounded-md" height={40} /> 
        <h1 className="text-2xl font-bold">
          Hive <span className="text-primary">Hub</span>
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />

        
        { session?.user.userType==="Company" && <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post a Job
        </Link>}
       
        {session?.user ? (
          <UserDropDown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
            userType={session.user.userType as string}
          />
        ) : (
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
