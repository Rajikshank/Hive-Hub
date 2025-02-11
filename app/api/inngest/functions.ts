import { prisma } from "@/utils/db";
import { inngest } from "@/utils/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const handleJobExpiration = inngest.createFunction(
  { id: "Job-expiration" ,cancelOn:[{
    event:"job/cancel.expiration",
    if:"event.data.jobId == async.data.jobId"
  }]},
  { event: "job/created" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("waiting-for-expiration", `${expirationDays}d`);

    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "EXPIRED",
        },
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);

// export const sendPeriodicJobListings = inngest.createFunction(
//   { id: "send-job-listings" },
//   { event: "jobseeker/created" },
//   async ({event,step})=>{

//     const {userId,email}=event.data


//     const totalDays=30;

//     const intervalDays= 2
//     let currentDay=0

//     while(currentDay<totalDays){

//       await step.sleep("wait-interval",`${intervalDays}d`)
//       currentDay+=intervalDays

//       const recentJobs=await step.run("fetch-recentjobs",async ()=>{

//         return await prisma.jobPost.findMany({
//           where:{
//             status:"ACTIVE"
//           },
//           orderBy:{
//             createdAt:"desc"
//           },
//           take:10,
//           include:{
//             Company:{
//               select:{
//                 name:true
//               }
//             }
//           }
//         })
//       })

//       if(recentJobs.length>0){

//         await step.run('send-email',async ()=>{


//         })
//       }

//     }


//   }
// );
