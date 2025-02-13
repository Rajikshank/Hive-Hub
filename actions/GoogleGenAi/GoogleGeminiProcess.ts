"use server";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetchPdf from "./fetchFile";
import { unstable_cache } from "next/cache";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: { responseMimeType: "application/json" },
});

export default async function geminiGenerate(
  jobTitle: string,
  jobDescription: string,
  resumeUrl: string
) {
  const cachedGeneration = unstable_cache(async () => {
    const fileBuffer = await fetchPdf(resumeUrl);

    // Extract text from the PDF
    const { text: resumeText } = await pdfParse(fileBuffer);

    // Construct a prompt with both resume text and job description

    const prompt = `
    You are an expert career advisor and ATS (Applicant Tracking System) evaluator.
    
    ### Step 1: Resume and Job Match Check  
    Analyze the candidate's resume and compare it to the job post description. If the resume does not match the job description significantly, return the following warning message and **DO NOT PROCEED FURTHER**:  
    
    **Warning:** "Your resume does not sufficiently match the job posting. Please review and update the resume to align better with the job requirements."
    format :{"warning":"...warning message"}
    
    ### Step 2: ATS Score Calculation  
    If the resume is a reasonable match, calculate the ATS score based on keyword matching, skills alignment, and job requirements. Return the ATS score as a percentage.
    
    **ATS_Score:** {calculated_score}%
    
    ### Step 3: Keyword Enhancement (if ATS Score < 80%)  
    If the ATS score is below 80%, suggest relevant keywords from the job description that should be added to improve the resume's match.
    
    **Suggested Keywords for Improvement:**  
    {keywords_list}
    return format :{"keywords":"suggested keywords"}
    ---
    #### Inputs:
    **Candidate’s Resume:**  
    ${resumeText}

    **Title of the Job Post:**  
    ${jobTitle}
    
    **Job  Description:**  
    ${jobDescription}
    
    `;

    console.log("expensive googe api run.....");

    // Initialize Google Gemini LLM using its Node.js client

    const result = await model.generateContent(prompt);
    const suggestions = result.response.text();

    console.log(suggestions);
    return suggestions;
  }, [jobDescription, resumeUrl]);

  return await cachedGeneration();
}

export async function generateResumeKeywords(resumeUrl: string) {
  const cachedGeneration = unstable_cache(async () => {
    const fileBuffer = await fetchPdf(resumeUrl);

    // Extract text from the PDF
    const { text: resumeText } = await pdfParse(fileBuffer);

    // Construct a prompt with both resume text and job description

    const prompt = `
    Extract the most relevant skills and keywords from the following resume text:
    ${resumeText}
    
    Return [string]
    `;

    console.log("expensive googe api run.....");

    // Initialize Google Gemini LLM using its Node.js client

    const result = await model.generateContent(prompt);
    const suggestions = result.response.text();

    console.log("relevant keywords", JSON.parse(suggestions));
    return JSON.parse(suggestions);
  }, [resumeUrl]);

  return await cachedGeneration();
}

export async function generateJobDescription(
  jobTitle: string,
  jobLocation: string,
  employementType: string,
  companyName: string
) {
  const cachedGeneration = unstable_cache(async () => {
    // Construct a prompt with both resume text and job description

    const prompt = `
    You are a professional HR copywriter skilled at crafting engaging and detailed job descriptions. Generate a job description in rich text format using the following parameters:

- **jobTitle:** ${jobTitle}
- **jobLocation:** ${jobLocation}
- **employementType:** ${employementType}
- **companyName:** ${companyName}

The job description should include these sections(no need to include a title as already the title will be displayed from the data):

1. **Job Overview:**  
   Provide a concise summary of the role, including its key purpose and impact within the company.

2. **Key Responsibilities:**  
   List the main duties and responsibilities associated with the position in a clear, bullet-point format.

3. **Qualifications:**  
   Outline the required skills, experiences, and educational background. Include any preferred qualifications that would make a candidate stand out.

4. **Company Overview:**  
   Describe {companyName} in a way that highlights its culture, mission, and unique qualities. Explain why this company is a great place to work.

5. **Benefits & Perks:**  
   Detail any benefits, perks, or incentives that the company offers, such as health insurance, remote work options, career development opportunities, etc.

6. **Application Process:**  
   Provide instructions on how candidates can apply, along with any relevant deadlines or additional steps.

Ensure the tone is professional, inviting, and tailored to attract high-quality candidates. The rich text format should include clear headings and should be compatible for the tip-tap rich text editor , bullet points, and appropriate emphasis where necessary.

Make sure the description includes these:
--good rich text format and stucture
--Ats friendly words for the relevant job
--emoji's and other word styling if needed
--ensure the it matches the tiptap compatible rich text

Return <Json>
    `;

    console.log("expensive googe api run.....");

    // Initialize Google Gemini LLM using its Node.js client
    try {
      const result = await model.generateContent(prompt);
      const description = result.response.text();

      console.log("generated description", description);

      return JSON.parse(description);
    } catch {
      
      return "Error Occured";
    }
  }, [jobTitle + jobLocation + companyName]);

  return await cachedGeneration();
}
