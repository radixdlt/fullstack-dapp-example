import { AppLogger } from '$lib/helpers/logger'
import type { UserType } from 'database'
import type { ControllerDependencies } from '$lib/server/_types'
import type { UserController } from '$lib/server/user/controller'
import type { UserQuestController } from '$lib/server/user-quest/controller'
import type { AuthController } from '$lib/server/auth/controller'

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
      controllers: {
        userController: UserController
        userQuestController: UserQuestController
        authController: AuthController
      }
      userQuestModel: UserQuestModel
      userModel: UserModel
      getAccountAddressModel: GetAccountAddressModelFn
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
