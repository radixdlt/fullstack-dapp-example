import Pino from 'pino';

export type AppLogger = typeof appLogger;
export const appLogger = Pino({ level: 'trace' });
export const createAppLogger = (options?: Parameters<typeof Pino>[0]) =>
	Pino(options) as unknown as AppLogger;
