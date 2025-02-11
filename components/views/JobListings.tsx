"use server";

import { prisma } from "@/utils/db";
import { EmptyPage } from "./EmptyPage";
import { JobCard } from "./JobCard";

import RecomendedJobView from "./RecomendedJobView";
import { MainPagination } from "./pagination";
import { JobPostStatus } from "@prisma/client";

async function getData({page  = 1, pageSize = 2,jobTypes=[],location=""}:{page:number,pageSize:number,jobTypes:string[],location:string}) {
  const skip = (page - 1) * pageSize;

  const where={
    status:JobPostStatus.ACTIVE,

    ...(jobTypes.length>0 &&{
      employmentType :{
        in:jobTypes
      }
    }),
...(location && location !== "Worldwide" &&{
 location:location
})
  }

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return { jobs: data, totalPage: Math.ceil(totalCount / pageSize) };
}

export async function JobListings({currentPage,jobTypes, location}:{currentPage:number,jobTypes:string [],location:string}) {
  const {jobs,totalPage} = await getData({page:currentPage,pageSize:2,jobTypes:jobTypes,location:location});
  // const data=await getRecommendedJob("Software engineer")

  return (
    <>
       <RecomendedJobView   />  
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6 ">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <EmptyPage
          buttonText="Go To Homepage"
          description="Please Try Again Later"
          href="/"
          title="No Jobs Found"
        />
      )}

      <div className="flex justify-center mt-6 ">
        <MainPagination totalPages={totalPage} currentPage={currentPage} />
      </div>
    </>
  );
}
