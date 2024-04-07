-- DropIndex
DROP INDEX "User_accountAddress_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountAddress" DROP NOT NULL;
