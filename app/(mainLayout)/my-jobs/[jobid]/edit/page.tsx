import EditJobForm from "@/components/forms/EditJobForm";
import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/requireUser";
import { notFound } from "next/navigation";

async function getJobPost({
    jobid,
    userId,
  }: {
    jobid: string;
    userId: string;
  }) {

    console.log("jobid",jobid,userId)
    const jobPost = await prisma.jobPost.findUnique({
      where: {
        id: jobid,
        Company: {
          userId: userId,
        },
      },
      select: {
        benefits: true,
        id: true,
        jobTitle: true,
        jobDescription: true,
        salaryTo: true,
        salaryFrom: true,
        location: true,
        employmentType: true,
        listingDuration: true,
        Company: {
          select: {
            about: true,
            name: true,
            location: true,
            website: true,
            xAccount: true,
            logo: true,
          },
        },
      },
    });
  
    if (!jobPost) {
      return notFound();
    }
  
    return jobPost;
  }


type Params=Promise<{jobid:string}>

export default async function EditJobPage({params}:{params:Params}) {
    const {jobid}=await params
    const user=await requireUser()
    console.log(user.id)
    const data =await getJobPost({ jobid, userId: user.id as string })


  return  <EditJobForm job={data }/>;
}
