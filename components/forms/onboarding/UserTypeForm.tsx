import { Button } from "@/components/ui/button";
import { Briefcase, Building2 } from "lucide-react";

type  UserSelectionType= "company" | "jobSeeker"  ;

interface UserTypeSelectionProps{
    onSelect :(type:UserSelectionType)=>void
}

export function UserTypeSelection({onSelect}:UserTypeSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold ">Welcome! Lets get started</h2>
        <p className="text-muted-foreground">
          Choose how would you like to use our platform{" "}
        </p>
      </div>

      <div className="grid gap-4">
        <Button onClick={()=>onSelect("company")}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          variant={"outline"}
        >
          <div className="size-12 rounded -full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Company / Organization</h3>
            <p>Post Jobs and find greate talents</p>
          </div>
        </Button>
        <Button
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          variant={"outline"}
          onClick={()=>onSelect("jobSeeker")}
        >
          <div className="size-12 rounded -full bg-primary/10 flex items-center justify-center">
            <Briefcase className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Job Seeker</h3>
            <p>Find your dream job with us</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
