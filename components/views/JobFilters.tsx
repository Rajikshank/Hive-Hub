"use client";

import { XIcon, FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
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
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currenJobTypes = searchParams.get("jobTypes")?.split(',') || [];
  const currentLocations = searchParams.get('location') || "";

  function clearAllFilter() {
    router.push("/main");
  }

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  }, [searchParams]);

  function handleJobTypeChange(jobType: string, checked: boolean) {
    const current = new Set(currenJobTypes);
    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }
    const newValue = Array.from(current).join(",");
    router.push(`?${createQueryString('jobTypes', newValue)}`);
  }

  function handleLocationChange(location: string) {
    router.push(`?${createQueryString('location', location)}`);
  }

  return (
    <Card className="bg-white/80 dark:bg-primary/10 backdrop-blur-sm border shadow-md rounded-lg">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Header & Clear Button */}
          <div className="flex items-center gap-2 min-w-24">
            <FilterIcon className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">Filters</span>
          </div>

          {/* Job Types */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <span className="text-sm font-medium text-gray-600 dark:text-white">Type:</span>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((job, index) => (
                <div
                  key={index}
                  className="group inline-flex items-center"
                >
                  <div className="flex items-center dark:bg-transparent  bg-white/50 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors duration-200">
                    <Checkbox
                      id={job}
                      checked={currenJobTypes.includes(job)}
                      onCheckedChange={(checked) => handleJobTypeChange(job, checked as boolean)}
                      className="h-4 w-4  transition-transform duration-200 hover:scale-105 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                    <Label
                      className="text-xs dark:text-white font-medium capitalize ml-2 cursor-pointer text-gray-600 group-hover:text-purple-600"
                      htmlFor={job}
                    >
                      {job}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Select */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-white">Location:</span>
            <Select
              onValueChange={handleLocationChange}
              value={currentLocations}
            >
              <SelectTrigger className="w-48 h-8 text-xs dark:bg-transparent bg-white/50 border hover:border-purple-400 focus:ring-1 focus:ring-purple-400 rounded-md">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                <SelectGroup>
                  <SelectLabel className="text-purple-600 text-xs">Worldwide</SelectLabel>
                  <SelectItem value="worldwide" className="text-xs">
                    <span>🌍</span>
                    <span className="pl-2">Worldwide / Remote</span>
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-purple-600 text-xs">Location</SelectLabel>
                  {countryList.map((country) => (
                    <SelectItem
                      value={country.name}
                      key={country.name}
                      className="text-xs"
                    >
                      <span>{country.flagEmoji}</span>
                      <span className="pl-2">{country.name}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Button */}
          <Button
            onClick={clearAllFilter}
            variant="ghost"
            size="sm"
            className="h-8 px-2 hover:bg-red-50 hover:text-red-600"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}