import type { UserType, PrismaClient } from 'database'
import type { ImageController } from '$lib/server/image/controller'
import { getQueues } from 'queues'
import { AppLogger } from 'common'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type Queue = ReturnType<typeof getQueues>
declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      userId: string
      userType: UserType
      dbClient: PrismaClient
      imageController: ImageController
      transactionQueue: Queue['transactionQueue']
      eventQueue: Queue['eventQueue']
      systemQueue: Queue['systemQueue']
      logger: AppLogger
    }
  }
}

export {}
