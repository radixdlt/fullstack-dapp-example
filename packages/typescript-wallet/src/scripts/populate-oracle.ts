import { PrismaClient } from 'database'
import { ImageController } from '../../../../apps/admin/src/lib/server/image/controller'
import { ImageModel } from '../../../../packages/common/src/image/model'
import { getQueues } from '../../../queues/src/queues'

const prisma = new PrismaClient()

const config = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    password: process.env.REDIS_PASSWORD ?? 'password'
  }
}
const queues = getQueues(config.redis)

const controller = ImageController({
  imageModel: ImageModel(prisma)(),
  systemQueue: queues.System
})

controller.populateImageOracle().map(() => {
  console.log('Populated oracle successfully')
}).mapErr((e) => {
  console.error(e)
})