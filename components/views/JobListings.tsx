"use server";

import { prisma } from "@/utils/db";
import { EmptyPage } from "./EmptyPage";
import { JobCard } from "./JobCard";

import RecomendedJobView from "./RecomendedJobView";
import { MainPagination } from "./pagination";
import { JobPostStatus, Prisma } from "@prisma/client";

async function getData({ 
  page = 1, 
  pageSize = 2, 
  jobTypes = [], 
  location = "", 
  SearchQuery = null 
}: { 
  page: number, 
  pageSize: number, 
  jobTypes: string[], 
  location: string, 
  SearchQuery: string | null 
}) {
  const skip = (page - 1) * pageSize;

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(SearchQuery && {
      jobTitle: {
        contains: SearchQuery,  
        mode: "insensitive" as Prisma.QueryMode    
      }
    }),
    ...(jobTypes.length > 0 && {
      employmentType: {
        in: jobTypes
      }
    }),
    ...(location && location !== "Worldwide" && {
      location: location
    })
  };

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
      where: { status: "ACTIVE" }
    }),
  ]);

  return { jobs: data, totalPage: Math.ceil(totalCount / pageSize) };
}


export async function JobListings({currentPage,jobTypes, location,SearchQuery}:{currentPage:number,jobTypes:string [],location:string,SearchQuery:string|null}) {
  const {jobs,totalPage} = await getData({page:currentPage,pageSize:2,jobTypes:jobTypes,location:location,SearchQuery});
  


  return (
    <>
      {!SearchQuery && <RecomendedJobView   />  }
      {SearchQuery && <div><h1 className="text-xl font-semibold">Search Result for : <span className="text-primary font-bold text-2xl">{SearchQuery}</span></h1></div>}
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
