"use client";
import { UploadDropzone } from "@/components/views/UploadThing";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { countryList } from "@/utils/countryList";
import { companySchema } from "@/utils/zodschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditCompany } from "@/actions/EditCompanyAction";
import Link from "next/link";

type Data = {
  name: string;
  location: string;
  about: string;
  logo: string;
  website: string;
  xAccount: string | null;
};

export function EditCompanyForm({ data }: { data: Data }) {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      about: data.about,
      location: data.location,
      name: data.name,
      xAccount: data.xAccount!,
      logo: data.logo,
      website: data.website,
    },
  });

  const [pending, setPending] = useState(false);

  async function OnSubmit(data: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await EditCompany(data);
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
      <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>WorldWide</SelectLabel>
                      <SelectItem value="worldwide">
                        <span>
                          🌍 <span>WordWide / Remote</span>
                        </span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>

                      {countryList.map((country) => (
                        <SelectItem key={country.name} value={country.name}>
                          <span> {country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="xAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X(Twitter) Account</FormLabel>
                <FormControl>
                  <Input placeholder="@yourCompany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your company..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit  ">
                      <Image
                        src={field.value}
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
                      endpoint={"imageUploader"}
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={(err) =>
                        console.log("something went wrong", err)
                      }
                      className="ut-button:bg-primary rounded-full  ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
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
            <Button className="w-full " variant={"destructive"} disabled={pending}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
