import { config } from './config';
import { Queue, ConnectionOptions } from 'bullmq';

const connection: ConnectionOptions = config.redis;

export const handleTransactionQueue = new Queue('foo', {
	connection
});
