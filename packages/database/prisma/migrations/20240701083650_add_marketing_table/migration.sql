-- CreateTable
CREATE TABLE "Marketing" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "utm_campaign" TEXT,
    "utm_medium" TEXT,
    "utm_source" TEXT,
    "utm_id" TEXT,
    "utm_content" TEXT,
    "utm_term" TEXT,

    CONSTRAINT "Marketing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Marketing" ADD CONSTRAINT "Marketing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
