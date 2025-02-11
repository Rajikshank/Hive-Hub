import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/requireUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

async function getData(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: {
      Company: {
        userId: userId,
      },
    },
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
  });

  return data;
}

export default async function CompanyJobPage() {
  const user = await requireUser();
  const data = await getData(user.id!);

  console.log(data);

  return (


    <div>
         <div className="py-4">
        <h1 className="font-bold   text-balance text-2xl text-muted-foreground"> Welcome <span className="text-primary">{user.name}</span>  To Job Board!!</h1>
      </div>


      <div className="grid grid-cols-2 gap-2 ">
     
      {data.map((job) => (
        <Card
          className="transition-all duration-300 hover:bg-primary/10 hover:border-primary"
          key={job.id}
        >
          <CardHeader>
            <CardTitle>{job.jobTitle}</CardTitle>
            <CardDescription>{job.location}</CardDescription>
          </CardHeader>

          <CardContent>
            <Link href={`/${job.id}`}>
              <Button className="" variant={"default"}>
                View / Edit
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
    
  );
}
