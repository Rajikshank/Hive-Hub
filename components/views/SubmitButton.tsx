"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GeneralSubmitButtonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  width?: string;
  icon?: ReactNode;
}

export function GeneralSubmitButton({
  text,
  variant,
  width,
  icon,
}: GeneralSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"outline"} disabled={pending}>
      {pending ? (
        <>
          {" "}
          <Loader2 className="size-4 animate-spin" /> <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={cn(
              savedJob ? "fill-current text-red-500" : "",
              "size-4 transition-colors"
            )}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}

export function ApplyButton({
  isAlreadyApplied,
}: {
  isAlreadyApplied: boolean;
}) {
  const { pending } = useFormStatus();

  return pending ? (
    <Button
      type="submit"
      className={"w-full "}
      variant= {"default"}
     
    >
     
       
         
          <Loader2 className="size-4 animate-spin" /> <span>Applying...</span>
        
     
     
    </Button>
  ) : (
    <Button
      type="submit"
      className={"w-full "}
      variant={isAlreadyApplied ? "secondary" : "default"}
      disabled={isAlreadyApplied}
    >
       
      {  isAlreadyApplied ? "Applied" : "Apply Now"}
    </Button>
  );
}
