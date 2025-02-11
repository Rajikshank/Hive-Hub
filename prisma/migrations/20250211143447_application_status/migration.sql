-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "AppliedJobPost" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';
