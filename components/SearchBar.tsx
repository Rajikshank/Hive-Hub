"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
type JOBPOSTS = {
  id: string;
  jobTitle: string;
  location: string;
}[];
export default function SearchBar({ jobPosts }: { jobPosts: JOBPOSTS }) {
  const [showSearchSuggestions, setShowSearchSuggestions] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");
  const [isInputFocused, setIsinputFocuesd] = useState<boolean>(false);
  const router = useRouter();

  const filteredData: JOBPOSTS = useMemo(
    () =>
      jobPosts.filter((Item) =>
        Item.jobTitle.split(" ").some((word) =>
          value
            .trim()
            .split(" ")
            .some((vec) => vec.toLowerCase() === word.toLowerCase())
        )
      ),

    [value, jobPosts]
  );

  console.log(filteredData);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={cn(
        isInputFocused ? "ring-primary ring-1" : "ring-1 ring-black/20",
        "max-w-4xl    mx-auto relative flex  items-center h-14 w-full shadow-sm  rounded-md bg-secondary "
      )}
    >
      <SearchIcon className="text-muted-foreground mx-2" size={35} />
      <Input
        style={{
          outline: "none",
          boxShadow: "none",
          border: "none",
        }}
        // ref={ref}
        onFocus={() => {
          if (value.length > 0) {
            setShowSearchSuggestions(true);
          }
          setIsinputFocuesd(true);
        }}
        onBlur={() => setIsinputFocuesd(false)}
        onChange={(e) => setValue(() => e.target.value)}
        onKeyUpCapture={() => {
          if (value.length > 0) {
            setShowSearchSuggestions(true);

            return;
          }

          setShowSearchSuggestions(false);
          return;
        }}
        onKeyDownCapture={() => setShowSearchSuggestions(false)}
        className="placeholder:text-lg   font-semibold text-lg  border-none shadow-none h-full "
        placeholder="Search By Job Title"
      />
      {showSearchSuggestions && (
        <div className="absolute top-14    min-h-4 z-10 p-2 bg-secondary shadow-md ring-1 ring-black/20 w-full mt-2 rounded-sm">
          {filteredData.length > 0
            ? filteredData.slice(0, 5).map((jobs, idx) => {
                const words = jobs.jobTitle
                  .trim()
                  .split(" ")
                  .map((word, id) => {
                    const isMatched = value
                      .trim()
                      .split(" ")
                      .some((vec) => vec.toLowerCase() === word.toLowerCase());

                    return (
                      <span
                        key={id}
                        className={`${
                          isMatched ? "font-bold text-primary/70" : ""
                        } text-lg `}
                      >
                        {" "}
                        {word}{" "}
                      </span>
                    );
                  });

                return (
                  <div
                    id="search-value"
                    onClick={() => router.push(`/job/${jobs.id}`)}
                    className="cursor-pointer p-1 rounded-sm hover:bg-zinc-300"
                    key={idx}
                  >
                    {words}
                  </div>
                );
              })
            : jobPosts.slice(0, 5).map((job, idx) => (
                <div
                  onClick={() => router.push(`/job/${job.id}`)}
                  className="cursor-pointer p-1 rounded-sm hover:bg-zinc-300"
                  key={idx}
                >
                  {job.jobTitle}
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
