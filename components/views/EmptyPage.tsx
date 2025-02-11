import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface iAppprops {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyPage({buttonText,description,href,title}:iAppprops) {
  return (
    <div className=" rounded-md border border-dashed  p-8 flex flex-col flex-1 h-full items-center justify-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary " />
      </div>
      <h2 className="mt-6 text-xl font-semibold ">{title}</h2>

      <p className="mb-8 mt-2 text-center max-w-sm text-balance text-muted-foreground text-sm leading-tight">
        {description}
      </p>
      <Link className={buttonVariants({ variant: "default" })} href={href}>
        <PlusCircle />
        {buttonText}
      </Link>
    </div>
  );
}
