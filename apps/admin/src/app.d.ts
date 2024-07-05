import type { UserType, PrismaClient } from 'database'
import type { RadmorphController } from '$lib/server/radmorph/controller'
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
      radmorphController: RadmorphController
    }
  }
}

export {}
