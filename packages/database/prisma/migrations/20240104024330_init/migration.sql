-- CreateTable
CREATE TABLE "User" (
    "identityAddress" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("identityAddress")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "challenge" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("challenge")
);
