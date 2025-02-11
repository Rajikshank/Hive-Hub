import { prisma } from "@/utils/db";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embedding = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004", // 768 dimensions
});

import { PineconeStore } from "@langchain/pinecone";

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { unstable_cache } from "next/cache";

const pinecone = new PineconeClient();
// Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

export const vectorStore = await PineconeStore.fromExistingIndex(embedding, {
  pineconeIndex,

  maxConcurrency: 5,
  // You can pass a namespace here too
  // namespace: "foo",
});

export async function getRecommendedJob(queryString: string) {
  const CachecdRelevancScorefun = unstable_cache(async () => {
    const jobsByRelevanceScore = await vectorStore.similaritySearchWithScore(
      queryString,
      3
    );

    console.log("expensive function ran...");
    const Jobdata = await prisma.jobPost.findMany({
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    });

    console.log("jobs by relavance score", jobsByRelevanceScore)

    const jobMap = new Map(Jobdata.map((job) => [job.id, job]));
    return (
      jobsByRelevanceScore
        .flat()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((id: any) => jobMap.get(id.id))
        .filter((job) => job)
    );
  }, [queryString]);

  const jobRecomendations = await CachecdRelevancScorefun();

  console.log(jobRecomendations);

  return jobRecomendations;
}
