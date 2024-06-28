import { AppLogger } from 'common'
import { PrismaClient } from 'database'

export const waitForMessage =
  (logger: AppLogger, db: PrismaClient) => async (userId: string, messageType: string) => {
    logger.info({ method: 'waitForMessage.start', userId, messageType })

    let expectedMessage: any
    while (!expectedMessage) {
      const messages = await db.message.findMany({
        where: { userId }
      })

      expectedMessage = messages.find((message) => (message.data as any).type === messageType)

      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    logger.info({ method: 'waitForMessage.complete', message: expectedMessage })
  }
