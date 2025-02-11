"use server"

import { prisma } from "@/utils/db";
import { aj } from "@/utils/protection-rules";
import { requireUser } from "@/utils/requireUser";
import { jobSchema } from "@/utils/zodschemas";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import {    z } from "zod";

export async function editJobPost(data: z.infer<typeof jobSchema>,jobId:string){

    const user= await requireUser()

   const req = await request();
     const decision = await aj.protect(req);
   
     if (decision.isDenied()) {
       throw new Error("Forbidden");
     }


     const validatedata =jobSchema.parse(data)


     await prisma.jobPost.update({
        where:{
            id:jobId,
            Company:{
                userId:user.id
            }
        }
        ,
        data:{
            jobDescription:validatedata.jobDescription,
            jobTitle:validatedata.jobTitle,
            employmentType:validatedata.employmentType,
            location:validatedata.location,
            salaryFrom:validatedata.salaryFrom,
            benefits:validatedata.benefits,
            salaryTo:validatedata.salaryTo,


        }
     })

     return redirect("/my-jobs")
}