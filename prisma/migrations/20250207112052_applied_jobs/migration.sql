/*
  Warnings:

  - You are about to drop the `_JobPostToJobSeeker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_JobPostToJobSeeker" DROP CONSTRAINT "_JobPostToJobSeeker_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobPostToJobSeeker" DROP CONSTRAINT "_JobPostToJobSeeker_B_fkey";

-- DropTable
DROP TABLE "_JobPostToJobSeeker";

-- CreateTable
CREATE TABLE "AppliedJobPost" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppliedJobPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppliedJobPost_userId_jobId_key" ON "AppliedJobPost"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "AppliedJobPost" ADD CONSTRAINT "AppliedJobPost_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedJobPost" ADD CONSTRAINT "AppliedJobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "JobSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
