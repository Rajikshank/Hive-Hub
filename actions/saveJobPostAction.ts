"use server"

import { prisma } from "@/utils/db";
import { aj } from "@/utils/protection-rules";
import { requireUser } from "@/utils/requireUser";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

export async function saveJobPost(jobId:string){

    const user =await requireUser()

      const req=await request()
        const decision=await aj.protect(req)
      
        if(decision.isDenied()){
          throw new Error("Forbidden")
        }
      

        await prisma.savedJobPost.create({
            data:{
                jobId:jobId,
                userId:user.id as string 

            }
        })

      return   revalidatePath(`/job/${jobId}`)
}


export async function deleteSavedJobPost(savedjobId:string){

    const user =await requireUser()

      const req=await request()
        const decision=await aj.protect(req)
      
        if(decision.isDenied()){
          throw new Error("Forbidden")
        }
      

     const data=   await prisma.savedJobPost.delete({
            where:{
               id:savedjobId,
               userId:user.id

            },
            select:{
                jobId:true
            }
        })
        return   revalidatePath(`/job/${data.jobId}`)
}