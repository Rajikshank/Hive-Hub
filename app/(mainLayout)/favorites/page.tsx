import { EmptyPage } from "@/components/views/EmptyPage";
import { JobCard } from "@/components/views/JobCard";

import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/requireUser";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      job: {
        select: {
          id: true,
          jobTitle: true,
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
      },
    },
  });

  return data;
}
export default async function FavoritesPage() {
  const session = await requireUser();
  const data = await getFavorites(session.id as string);

  if (data.length === 0) {
    return (
      <EmptyPage
        description=""
        title="No Jobs Found..."
        buttonText="Go back to Home"
        href="/"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5 gap-4 ">
      {data.map(({ job }) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
