import deleteJobPostAction from "@/actions/deleteJobPostAction";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeneralSubmitButton } from "@/components/views/SubmitButton";
import { requireUser } from "@/utils/requireUser";
import { ArrowLeft, Trash2Icon } from "lucide-react";
import Link from "next/link";


type Params=Promise<{jobid:string}>
export default async  function DeleteJobPage({params}:{params:Params}) {
const {jobid}=await params
    await requireUser()
  return (
    <div>
      <Card className="max-w-lg mx-auto mt-28 ">
        <CardHeader>
          <CardTitle>Are your absolutely sure?</CardTitle>
          <CardDescription>
            This Action will completly remove the job listing from our server
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center justify-between">
          <Link className={buttonVariants({variant:"secondary"})} href={"/my-jobs"}>
            <ArrowLeft />
            Cancel
          </Link>

          <form action={ async ()=>{

            "use server"
            await deleteJobPostAction(jobid)
          }}>

            <GeneralSubmitButton  text="Delete Job" variant="destructive" icon={<Trash2Icon/>}/>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
