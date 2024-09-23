-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FraudScoringOutput" ADD VALUE 'ALLOWED';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'ALLOWED_NO_IPQS_DATA';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'ALLOWED_GOLDEN_TICKET';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'BLOCKED_IS_FARMER';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'BLOCKED_IPQS_SCORE';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'BLOCKED_SANCTIONED_COUNTRY';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'BLOCKED_BLOCKED_COUNTRY';
ALTER TYPE "FraudScoringOutput" ADD VALUE 'BLOCKED_PERMANENTLY_BLOCKED';
