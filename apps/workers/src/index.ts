import { config } from "./config";
import { logger } from "./helpers/logger";
import { Worker, ConnectionOptions } from "bullmq";
import { PrismaClient } from "database";

const { user, password, host, port, database } = config.postgres;

const dbClient = new PrismaClient({
  datasourceUrl: `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`,
});

const connection: ConnectionOptions = config.redis;

const worker = new Worker(
  "foo",
  async (job) => {
    logger.debug(job.data);
    try {
      // test db connection
      await dbClient.user.findFirst();
      logger.debug("db connection success");
    } catch (error) {
      logger.debug("db connection failed");
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  logger.debug(`${job.id} has completed!`);
});

// test db connection
dbClient.user
  .findFirst()
  .then(() => {
    logger.debug("db connection success");
  })
  .catch(() => {
    logger.debug("db connection failed");
  });
