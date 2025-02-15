import { prisma } from "@/utils/db";
 
import { aj } from "@/utils/protection-rules";
import { requireUser } from "@/utils/requireUser";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import { vectorStore } from "./VectorStore/recommendation";

export default async function cancelJobApplicationAction(jobId: string ) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prisma.appliedJobPost.delete({
    where: {
      jobSeekerid_jobId: {
        jobSeekerid: user.jobseekerId!,
        jobId: jobId
      }
    },
  });

  await vectorStore.delete({ ids: [jobId] });

 

  redirect("/my-jobs");
}
