import type { AppLogger } from 'common'
import type { PrismaClient } from 'database'

export const waitForMessage =
  (logger: AppLogger, db: PrismaClient) => async (userId: string, messageType: string) => {
    logger.info({ method: 'waitForMessage.start', userId, messageType })

    let expectedMessage: any
    while (!expectedMessage) {
      const messages = await db.message.findMany({
        where: { userId, seenAt: null }
      })

      expectedMessage = messages.find((message) => (message.data as any).type === messageType)

      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    await db.message.update({
      where: { userId, id: expectedMessage.id },
      data: { seenAt: new Date() }
    })

    logger.info({ method: 'waitForMessage.complete', message: expectedMessage })
  }
