"use server";

import { EditCompanyForm } from "@/components/forms/onboarding/EditCompanyForm";
import { EditJobSeekerForm } from "@/components/forms/onboarding/EditJobSeekerForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/requireUser";

async function getCompanydata(userId:string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      about: true,
      name: true,
      logo: true,
      location: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    throw new Error("Data not found....");
  }

  return data;
}

async function getJobSeekerdata(userId:string) {
    const data = await prisma.jobSeeker.findUnique({
      where: {
        userId: userId,
      },
      select: {
       about:true,name:true,
       resume:true,
       user:{
        select:{
            image:true
        }
       }
      },
    });
  
    if (!data) {
      throw new Error("Data not found....");
    }
  
    return data;
  }


  type companyDataType={
     name: string; location: string; about: string; logo: string; website: string; xAccount: string | null; 
  }

  type jobseekerDatatype={
     user: { image: string | null; } 
     name: string 
     about: string
      resume: string  
  }

export default async function EditprofilePage() {
  const user = await requireUser();
  const data = user.userType ==="Company"?  await getCompanydata(user.id as string) : await getJobSeekerdata(user.id as string);

  return (
    <Card className="p-6 my-4   mx-auto">

<CardHeader>
    <CardTitle>
      <h1 className="text-2xl font-semibold">Edit Your Profile</h1>  
    </CardTitle>
    <CardDescription>{ user.userType === "Company" ?  "Refine Your Profile for more Reachable to a employee" : "Refine Your Profile for Ats Friendly based On Ai Generated Results"}</CardDescription>
</CardHeader>
       <CardContent>
      {user.userType === "Company" ? <EditCompanyForm data={data as companyDataType} /> : <EditJobSeekerForm data={data as jobseekerDatatype}/>}
    
      </CardContent> 
    </Card>
  );
}
