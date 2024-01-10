import type { PrismaClient as ImportedPrismaClient } from 'database';
import { createRequire } from 'module';

// ugly workaround for making PrismaClient work with SvelteKit
const require = createRequire(import.meta.url);
const { PrismaClient: RequiredPrismaClient } = require('@prisma/client');

const _PrismaClient: typeof ImportedPrismaClient = RequiredPrismaClient;

export class PrismaClient extends _PrismaClient {}
