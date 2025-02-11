"use server";

 
import { prisma } from "@/utils/db";
import { aj } from "@/utils/protection-rules";
import { requireUser } from "@/utils/requireUser";
import { jobSeekerSchema } from "@/utils/zodschemas";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateResumeKeywords } from "./GoogleGenAi/GoogleGeminiProcess";


 

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  const req=await request()

  const decision=await aj.protect(req)

  if(decision.isDenied()){
    throw new Error("Forbidden")
  }


  const validatedData = jobSeekerSchema.parse(data);
  const ats_keywords:string []=await generateResumeKeywords(validatedData.resume)

  await prisma.user.update({
    where: {
      id: user.id as string,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validatedData, ats_keywords
        },
      },
    },
  });

  return redirect("/");
}
