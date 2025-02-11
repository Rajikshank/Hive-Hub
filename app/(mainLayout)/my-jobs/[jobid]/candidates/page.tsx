import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/requireUser";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, CircleCheck, Frown, MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AcceptCandidate, RejectCandidate } from "@/actions/candidateAction";
import ResumeViewer from "@/components/views/ResumeViewer";
 

async function getData(jobid: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobid,

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
      AppliedJobPost: {
        include: { jobseeker: { include: { user: true } } },
        orderBy: { ATS_Score: "desc" },
      },
      Company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
  });

  return data;
}

type Params = Promise<{ jobid: string }>;
export default async function CandidatePage({ params }: { params: Params }) {
  const jobid = (await params).jobid;
  const user = await requireUser();
  const data = await getData(jobid!, user.id!);

  console.log(data);

  if(data?.AppliedJobPost.length===0){
    return <Card> 
      <CardHeader>
 <h1 className="text-xl font-semibold">Your are viewing the candidates for <span className="text-primary">{data?.jobTitle}</span>  Job Post</h1>
 </CardHeader>
      <CardContent className="space-y-4">
        <Frown  className="justify-self-center" size={60}/>
        <h1 className="text-center text-2xl ">Sorry, there are no candidates for this job yet.</h1>
      </CardContent>
    </Card>
  }

  return (
    <Card>

<CardHeader>
      <CardTitle className="flex justify-between flex-row">
        <h1 className="text-xl font-semibold">Your are viewing the candidates for <span className="text-primary">{data?.jobTitle}</span>  Job Post</h1>
        <h1 className="text-xm text-muted-foreground font-semibold">Total   <span className="text-primary">{data?.AppliedJobPost.length}</span>  Candidates</h1>
      </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile Picture</TableHead>
              <TableHead>Candidate Name</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Resume</TableHead>

              <TableHead className=" text-center ">ATS Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.AppliedJobPost.map((candidateData) => (
              <TableRow key={candidateData.id}>
                <TableCell>
                  <Image
                    src={candidateData.jobseeker.user.image as string}
                    alt="candidate-logo"
                    width={40}
                    height={40}
                    className="rounded-md size-10"
                  />
                </TableCell>
                <TableCell>{candidateData.jobseeker.name}</TableCell>
                <TableCell>
                  {candidateData.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {/* {candidateData. .status.charAt(0).toUpperCase() +
                        listing.status.slice(1).toLowerCase()} */}{" "}
                  <Badge
                    className={cn(
                      candidateData.status === "PENDING"
                        ? "bg-slate-500"
                        : candidateData.status === "ACCEPTED"
                        ? "bg-green-500"
                        : "bg-red-500",
                      "font-semibold "
                    )}
                  >
                    {candidateData.status}
                  </Badge>
                </TableCell>

                <TableCell className=" text-center">
                  <ResumeViewer resumeUrl={candidateData.jobseeker.resume}/>
                </TableCell>
                <TableCell>
                    <div
                    className={cn(
                      candidateData.ATS_Score && candidateData.ATS_Score > 80
                        ? "text-green-400"
                        : candidateData.ATS_Score &&
                          candidateData.ATS_Score < 80 &&
                          candidateData.ATS_Score > 60
                        ? "text-yellow-400"
                        : "text-red-600",
                      "text-2xl  text-center font-bold"
                    )}
                  >
                    {candidateData.ATS_Score ? candidateData.ATS_Score : 0}%
                  </div>  
                 
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} size={"icon"}>
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>

                        <form action={AcceptCandidate.bind(null,candidateData.id,candidateData.jobId)}>
                        <Button variant={"outline"} disabled={candidateData.status==="ACCEPTED"} type="submit" className=" w-full cursor-pointer hover:bg-green-500">
                          <CircleCheck />
                          Accept
                        </Button>

                        </form>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>

                        <form action={RejectCandidate.bind(null,candidateData.id,candidateData.jobId)}>
                        <Button disabled={candidateData.status==="REJECTED"} variant={"outline"} className=" w-full cursor-pointer hover:bg-red-500">
                          <Ban />
                          Reject
                        </Button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
