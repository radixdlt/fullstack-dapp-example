-- CreateTable
CREATE TABLE "ReferralXrd" (
    "userId" TEXT NOT NULL,
    "claimed" INTEGER NOT NULL,
    "readyToClaim" INTEGER NOT NULL,

    CONSTRAINT "ReferralXrd_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralXrd_userId_key" ON "ReferralXrd"("userId");

-- AddForeignKey
ALTER TABLE "ReferralXrd" ADD CONSTRAINT "ReferralXrd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
