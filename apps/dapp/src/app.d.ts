import { AppLogger } from '$lib/helpers/logger'
import type { UserType } from 'database'
import type { ControllerDependencies, Controllers } from '$lib/server/_types'

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
      dependencies: ControllerDependencies
      controllers: Controllers
      userQuestModel: UserQuestModel
      userModel: UserModel
      getAccountAddressModel: GetAccountAddressModelFn
    }
    // interface PageData {}
    // interface Platform {}
  }

  declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:swipe'?: CompositionEventHandler<T>
    }
  }
}

export {}
