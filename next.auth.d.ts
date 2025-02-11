import   { type DefaultSession } from "next-auth";
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
 export  interface Session {
    user: {
      role?: string;
      userType: string;
      resume?: string;
      about?: string;
      jobseekerId? :string
      jobseekerResume?:string
      keywords?:string []
      
    } & DefaultSession["user"];
  }

  interface User {
    userType?: "Company" | "JOB_SEEKER";
    resume?: string;
    about?: string;
  }
}
