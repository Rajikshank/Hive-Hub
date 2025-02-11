import { prisma } from "@/utils/db";
import { inngest } from "@/utils/inngest/client";
import { aj } from "@/utils/protection-rules";
import { requireUser } from "@/utils/requireUser";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import { vectorStore } from "./VectorStore/recommendation";

export default async function deleteJobPostAction(jobId: string) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prisma.jobPost.delete({
    where: {
      id: jobId,

      Company: {
        userId: user.id,
      },
    },
  });

  await vectorStore.delete({ ids: [jobId] });

  await inngest.send({ name: "job/cancel.expiration", data: { jobId: jobId } });

  redirect("/my-jobs");
}
