"use client";

import { UploadButton, UploadDropzone } from "@/components/views/UploadThing";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobSeekerSchema } from "@/utils/zodschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dummy from "@/public/logo.png";
import { editJobSeeker } from "@/actions/EditJobSeekerAction";
import Link from "next/link";

type Data = {
  name: string;
  user: {
    image: string | null;
  };
  about: string;
  resume: string | null;
} | null;

export function EditJobSeekerForm({ data }: { data: Data }) {
 
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: data?.name,
      about: data?.about,
      resume: data?.resume as string,
      image: data?.user.image as string,
    },
  });

  const [pending, setPending] = useState(false);

  async function OnSubmit(data: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      await editJobSeeker(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("something went wrong...");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6 " onSubmit={form.handleSubmit(OnSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <div className="flex items-center justify-center flex-col gap-2">
              <Image
                src={field.value ? field.value : dummy}
                width={150}
                height={150}
                alt="profile-pic"
                className="rounded-full object-fill w-[150px] h-[150px]"
              />

              <UploadButton
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  field.onChange(res[0].url);
                }}
                onUploadError={(err) =>
                  console.log("something went wrong", err)
                }
                className="ut-button:bg-primary"
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Resume (PDF only)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={"/pdf.png"}
                        width={100}
                        height={100}
                        alt="Company Logo"
                        className="rounded-lg "
                      />
                      <Button
                        onClick={() => field.onChange("")}
                        type="button"
                        size={"icon"}
                        variant={"destructive"}
                        className="absolute -top-2 -right-2"
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint={"resumeUploader"}
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={(err) =>
                        console.log("something went wrong", err)
                      }
                      className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2  gap-20 justify-self-center ">
          <Button type="submit" className="w-32" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
          </Button>

          <Link className="w-32" href={"/"}>
            <Button
              className="w-full "
              variant={"destructive"}
              disabled={pending}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
