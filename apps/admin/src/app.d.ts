import type { UserType, PrismaClient, BlockedCountryModel } from 'database'
import type { ImageController } from '$lib/server/image/controller'
import { Queues } from 'queues'
import { AppLogger } from 'common'
import { AppLogger, GoldenTicketModel, TransactionIntentHelper } from 'common'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

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
      blockedCountryModel: BlockedCountryModel
      imageController: ImageController
      queues: Queues
      logger: AppLogger
      goldenTicketModel: ReturnType<ReturnType<typeof GoldenTicketModel>>
      transactionIntentHelper: TransactionIntentHelper
    }
  }
}

export {}
