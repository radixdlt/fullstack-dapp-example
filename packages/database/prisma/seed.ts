import { PrismaClient } from '../src/prisma'
import { ImageController } from '../../../apps/admin/src/lib/server/image/controller'
import { ImageModel } from '../../../packages/common/src/image/model'
import * as Morphs from './radmorph-mock-urls.json'

const prisma = new PrismaClient()

async function main() {
  const controller = ImageController({
    imageModel: ImageModel(prisma)(),
    systemQueue: {} as any
  })

  await controller.uploadImagesJson({
    data: Object.fromEntries(Object.entries(Morphs).slice(0, 3300)),
    imageType: 'RadMorph'
  }).mapErr((e) => {
    console.log(e)
    return e
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Seed completed successfully')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
