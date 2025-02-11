import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      console.log("token is", token, user);
      if (session) {
        if (user.userType && user.userType === "JOB_SEEKER") {
          const jobSeeker = await prisma.jobSeeker.findUnique({
            where: {
              userId: user.id,
            },select:{
              name:true,
       ats_keywords:true,
              resume:true,
              id:true,
                
            }
          });

          session.user.jobseekerId = jobSeeker?.id;
          session.user.jobseekerResume = jobSeeker?.resume;
          session.user.keywords=jobSeeker?.ats_keywords
          session.user.role = user.userType;
           
        } else {
          session.user.role = user.userType;
        }
      }
      return session;
    },
  },
});
