-- CreateTable
CREATE TABLE "UserPhoneNumber" (
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPhoneNumber_pkey" PRIMARY KEY ("phoneNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoneNumber_userId_key" ON "UserPhoneNumber"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoneNumber_phoneNumber_key" ON "UserPhoneNumber"("phoneNumber");

-- AddForeignKey
ALTER TABLE "UserPhoneNumber" ADD CONSTRAINT "UserPhoneNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
