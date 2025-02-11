import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

interface iAppprops {
  job: {
    id: string;
    createdAt: Date;
    Company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    } | null;
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    
  };
  recommendation?: boolean;
}

export function JobCard({ job, recommendation=false }: iAppprops) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card
        className={`hover:shadow-lg transition-all ${
          recommendation ? "bg-primary/10 border-gray-600    " : "hover:border-primary"
        } duration-300  `}
      >
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={job.Company?.logo as string}
              alt={job.Company?.name as string}
              width={48}
              height={48}
              className="size-12 rounded-lg  "
            />

            <div>
              <h1 className="text-xl md:text-2xl font-bold">{job.jobTitle}</h1>

              <div className="flex flex-wrap gap-2">
                <p className="text-sm text-muted-foreground">
                  {job.Company?.name}
                </p>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge variant={"secondary"} className="rounded-full">
                  {job.employmentType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full ">{job.location}</Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <p className="text-sm text-muted-foreground ">
                  {formatCurrency(job.salaryFrom)} -{" "}
                  {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>

            <div className="md:ml-auto  text-right ">
              <div className="flex items-center gap-2 justify-end">
                {" "}
                <MapPin className="size-4" />
                <h1>{job.location}</h1>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-base text-muted-foreground line-clamp-2 !mt-5">
              {job.Company?.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
