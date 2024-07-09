-- CreateTable
CREATE TABLE "UserEmail" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "newsletter" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserEmail_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_userId_key" ON "UserEmail"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_email_key" ON "UserEmail"("email");

-- AddForeignKey
ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
