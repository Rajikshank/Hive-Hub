/*
  Warnings:

  - You are about to drop the column `userId` on the `AppliedJobPost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobSeekerid,jobId]` on the table `AppliedJobPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobSeekerid` to the `AppliedJobPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppliedJobPost" DROP CONSTRAINT "AppliedJobPost_userId_fkey";

-- DropIndex
DROP INDEX "AppliedJobPost_userId_jobId_key";

-- AlterTable
ALTER TABLE "AppliedJobPost" DROP COLUMN "userId",
ADD COLUMN     "jobSeekerid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AppliedJobPost_jobSeekerid_jobId_key" ON "AppliedJobPost"("jobSeekerid", "jobId");

-- AddForeignKey
ALTER TABLE "AppliedJobPost" ADD CONSTRAINT "AppliedJobPost_jobSeekerid_fkey" FOREIGN KEY ("jobSeekerid") REFERENCES "JobSeeker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
