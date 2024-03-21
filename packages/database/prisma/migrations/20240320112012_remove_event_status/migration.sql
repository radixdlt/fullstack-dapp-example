/*
  Warnings:

  - You are about to drop the column `status` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventError" AS ENUM ('ERROR_INVALID_DATA', 'ERROR_USER_NOT_FOUND', 'ERROR_UNHANDLED_EVENT');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "status",
ADD COLUMN     "error" "EventError";

-- DropEnum
DROP TYPE "EventStatus";
