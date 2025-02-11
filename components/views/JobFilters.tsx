"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent  } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/utils/countryList";
import { useCallback, } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
 

  const router = useRouter();
const searchParams=useSearchParams()
  const currenJobTypes=searchParams.get("jobTypes")?.split(',') || []
  const currentLocations =searchParams.get('location') || ""

  function clearAllFilter() {
    router.push("/");
  }


  const createQueryString=useCallback((name:string,value:string)=>{
    const params=new URLSearchParams(searchParams.toString())

    if(value){
      params.set(name,value)
    }else{
      params.delete(name)
    }

    return params.toString()
  },[searchParams])

  function handleJobTypeChange(jobType:string,checked:boolean){

    const current =new Set(currenJobTypes)

    if(checked){
      current.add(jobType)

    }
    else{
      current.delete(jobType)
    }

    const newValue=Array.from(current).join(",")

    router.push(`?${createQueryString('jobTypes',newValue)}`)
  }


  function handlelocationChange(location:string){
    router.push(`?${createQueryString('location',location)}`)
  }
  return (
    <Card className=" h-fit border-none shadow-none ">
      {/* <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button onClick={clearAllFilter} variant={"destructive"} size={"sm"} className="h-8">
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader> */}
      {/* <Separator className="mb-4" /> */}
      <CardContent className=" items-center flex-row flex p-2  justify-evenly gap-8 ">
       
       <div className="p-1"><h1 className="text-xl font-semibold">Filters</h1></div>
       <Separator orientation="vertical" className="h-20" />
        <div className=" flex items-center gap-8 ">
          <Label className="text-lg font-semibold ">Job Type</Label>

          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div className="flex items-center space-x-2" key={index}>
                {" "}
                <Checkbox
                  id={job}
                  checked={currenJobTypes.includes(job)}

                  onCheckedChange={(checked)=>{
                    handleJobTypeChange(job,checked as boolean)
                  }}
                  
                />
                <Label className="text-sm font-medium" htmlFor={job}>
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>

          {/* <Separator orientation="vertical" className="h-10" />   */}

        <div className=" w-96  flex gap-8">
          <Label className="text-lg font-semibold">Location</Label>

          <Select   onValueChange={(location)=>{
            handlelocationChange(location)
          }} value={currentLocations} >
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent >
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="pl-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem value={country.name} key={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

       
        
        <Button onClick={clearAllFilter} variant={"destructive"} size={"sm"} className="h-8">
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
       
      </CardContent>
    </Card>
  );
}
