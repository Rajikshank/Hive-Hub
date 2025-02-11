import { getRecommendedJob } from "@/actions/VectorStore/recommendation";
import React from "react";
import { JobCard } from "./JobCard";
import { Separator } from "../ui/separator";
import { requireUser } from "@/utils/requireUser";

 
 

export default async function RecomendedJobView( ) {

  const user =await requireUser()

  const recommendedJobs =  await getRecommendedJob(user.keywords?.toString() as string );

  

  //const recommendedJobs=FilterRecomendations(Jobdata,recommendation)
console.log("recommender query string",user.keywords)
  console.log("recomended with score","----------\n ",recommendedJobs)
  return (
    <div className=" flex flex-col gap-2 ">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground ">
          Top Recommended Jobs Based on your Profile
        </h1>
      </div>
      {recommendedJobs.map((job) => (
        <JobCard recommendation={true} job={job!} key={job?.id} />
      ))}

      <Separator className="mt-2 " />
    </div>
  );
}
