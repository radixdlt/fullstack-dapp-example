-- CreateIndex
CREATE INDEX CONCURRENTLY IF NOT EXISTS "Message_userId_seenAt_idx" ON "Message"("userId", "seenAt");


