import { AppLogger } from '$lib/helpers/logger'
import type { UserType } from 'database'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      userId: string
      userType: UserType
      authToken: string
      context: { traceId: string; logger: AppLogger }
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
