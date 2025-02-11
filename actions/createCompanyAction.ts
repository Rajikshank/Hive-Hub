"use server";

import { prisma } from "@/utils/db";
import { aj } from "@/utils/protection-rules";
import { requireUser } from "@/utils/requireUser";
import { companySchema } from "@/utils/zodschemas";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";

import { z } from "zod";

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();
  const req=await request()
    const decision=await aj.protect(req)
  
    if(decision.isDenied()){
      throw new Error("Forbidden")
    }
  
  

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "Company",
      Company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}
