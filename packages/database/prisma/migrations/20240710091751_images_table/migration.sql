/*
  Warnings:

  - You are about to drop the `RadMorphImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('RadMorph', 'RadGem', 'Card');

-- DropTable
DROP TABLE "RadMorphImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
