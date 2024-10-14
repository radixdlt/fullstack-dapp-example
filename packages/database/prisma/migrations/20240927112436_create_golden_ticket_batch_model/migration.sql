-- Create the new GoldenTicketBatch table
CREATE TABLE "GoldenTicketBatch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "type" "TicketType" NOT NULL DEFAULT 'FULL',
    "ownerId" TEXT NOT NULL,
    PRIMARY KEY ("id")
);

CREATE INDEX "GoldenTicketBatch_ownerId_idx" ON "GoldenTicketBatch" USING HASH ("ownerId");

INSERT INTO
    "GoldenTicketBatch" (
        "id",
        "createdAt",
        "expiresAt",
        "description",
        "type",
        "ownerId"
    )
SELECT
    "batchId",
    MIN("createdAt"),
    MAX("expiresAt"),
    "description",
    "type",
    "ownerId"
FROM "GoldenTicket"
GROUP BY
    "batchId",
    "description",
    "type",
    "ownerId";

ALTER TABLE "GoldenTicket"
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "expiresAt",
DROP COLUMN "type",
DROP COLUMN "ownerId";

ALTER TABLE "GoldenTicketBatch"
ADD CONSTRAINT "GoldenTicketBatch_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "GoldenTicket"
ADD CONSTRAINT "GoldenTicket_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "GoldenTicketBatch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;