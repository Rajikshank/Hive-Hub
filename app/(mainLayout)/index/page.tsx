 
import { Separator } from "@/components/ui/separator";
//import CompanyJobPage from "@/components/views/CompanyJobPage";
import { JobFilter } from "@/components/views/JobFilters";
import JobListingLoading from "@/components/views/JobListingLoading";
import { JobListings } from "@/components/views/JobListings";
import MainPageWrapper from "@/components/views/MainPageWrapper";

import { requireUser } from "@/utils/requireUser";
import { redirect } from "next/navigation";
import { Suspense  } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;

  const currenPage = Number(params.page) || 1;

  const user = await requireUser();

  const jobTypes = params.jobTypes?.split(",") || [];

  const location = params.location || "";

  const filterKey = `page=${currenPage};types=${jobTypes.join(
    ","
  )};location=${location}`;

  if(user.role && user.role.toLowerCase() === "company" ){
    redirect("/my-jobs")
  }

 
  return (
    <MainPageWrapper>
      <div className=" flex flex-col gap-4">
        {/* {user.role && user.role.toLowerCase() === "company" ? (
          <div className="col-span-3 flex flex-col gap-6">
            <CompanyJobPage />
          </div>
        ) : ( */}
          <>
            {" "}
            <JobFilter />
            <Separator className="w-full" />
            <div className="col-span-2 flex flex-col gap-6">
              <Suspense fallback={<JobListingLoading />} key={filterKey}>
                <JobListings
                  location={location}
                  jobTypes={jobTypes}
                  currentPage={currenPage}
                />
              </Suspense>
            </div>{" "}
          </>
        {/* )} */}
      </div>
    </MainPageWrapper>
  );
}
