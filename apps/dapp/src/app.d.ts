import { AppLogger } from '$lib/helpers/logger'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      userId: string
      authToken: string
      context: { traceId: string; logger: AppLogger }
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
