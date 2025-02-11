import { z } from "zod";
export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(1, "location must be defined"),
  about: z
    .string()
    .min(10, "please provider some information about your company"),
  logo: z.string().min(1, "Please upload a logo"),
  website: z.string().url("Please enter a valid url"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 charecters long"),
  about: z.string().min(10, "Please add more information about yourself"),
  resume: z.string().min(1, "Please upload your resume"),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Job title must contain at least 2 characters."),
  employmentType: z.string().min(1, "Select an employment type to proceed."),
  location: z.string().min(1, "Please specify a job location."),
  salaryFrom: z.number().min(1, "Enter a valid 'salary from' amount."),
  salaryTo: z.number().min(1, "Enter a valid 'salary to' amount."),
  jobDescription: z.string().min(1, "Provide a job description."),
  benefits: z
    .array(z.string())
    .min(1, "Select at least one benefit for the position."),
  companyName: z.string().min(1, "Company name cannot be empty."),
  companyLocation: z.string().min(1, "Provide the company's location."),
  companyLogo: z.string().min(1, "Upload the company logo."),
  companyWebsite: z.string().min(1, "Provide the company's website URL."),
  companyXAccount: z.string().optional(),
  companyDescription: z.string().min(1, "Add a description for the company."),
  listingDuration: z.number().min(1, "Specify the listing duration in days."),
  VectorStore_plaitext: z.string().optional(),
});
