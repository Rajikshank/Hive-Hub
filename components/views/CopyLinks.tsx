 'use client'

import { Link2 } from "lucide-react"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { toast } from "sonner"

export default function CopyLinks({jobUrl}:{jobUrl:string}) {

    async function handleCopy(){

        try {
            await navigator.clipboard.writeText(jobUrl)
            toast.success("URL copied to clipboard")
        } catch (error) {
            console.log(error)
            toast.error("Failed to copy url")
        }
    }
  return (
   <DropdownMenuItem className="cursor-pointer" onSelect={handleCopy}>

    <Link2 className="size-4"/>
    <span>Copy Job Url</span>
   </DropdownMenuItem>
  )
}
