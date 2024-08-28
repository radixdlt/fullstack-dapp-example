import { ResultAsync } from 'neverthrow'
import { CreateRadGemsJob } from 'queues'
import { config } from '../config'
import {
  ImageModel,
  transformRadgemToNfData,
  newRadgem,
  ColorCodeDescription,
  ShaderCodeDescription,
  WorkerError
} from 'common'
import { WorkerOutputError } from '../_types'

export const createRadGemsManifest =
  (imageModel: ReturnType<ImageModel>) => (items: CreateRadGemsJob[]) => {
    const { accounts, badges, components } = config.radQuest
    const results: ResultAsync<string, WorkerOutputError>[] = []

    for (const item of items) {
      const { elementsCount, userId } = item
      const numberOfRadgems = Math.floor(elementsCount / config.radQuest.elementsPerRadgem)
      const radGems = Array(numberOfRadgems).fill(null).map(newRadgem).map(transformRadgemToNfData)

      const result = ResultAsync.combine(
        radGems.map((radGem) =>
          imageModel
            .getRadGemKeyImageUrl(
              radGem.color as ColorCodeDescription,
              radGem.material as ShaderCodeDescription
            )

            .map((key_image_url) => ({ ...radGem, key_image_url }))
        )
      )
        .map((radgems) =>
          radgems
            .map(
              ({ key_image_url, name, description, material, color, rarity, quality }) => `Tuple(
              "${key_image_url}", 
              "${name}", 
              "${description}", 
              "${material}", 
              "${color}", 
              "${rarity}", 
              Decimal("${quality}")
            )
            `
            )
            .join(', ')
        )
        .map(
          (radgemTuples) => `
          CALL_METHOD
            Address("${accounts.system.address}")
            "create_proof_of_amount"
            Address("${badges.adminBadgeAddress}")
            Decimal("1")
          ;

          CALL_METHOD
            Address("${components.radgemForgeV2}")
            "mint_radgems"
            "${userId}"
            Array<Tuple>(
              ${radgemTuples}
            )
          ;`
        )
        .mapErr((error) => ({ reason: WorkerError.FailedToCreateRadGem, jsError: error }))

      results.push(result)
    }

    return ResultAsync.combine(results).map(
      (mintRadGemsOperation) => `
        CALL_METHOD
          Address("${accounts.payer.accessController}")
          "create_proof"
        ;

        CALL_METHOD
          Address("${accounts.system.accessController}")
          "create_proof"
        ;

        CALL_METHOD
          Address("${accounts.payer.address}")
          "lock_fee"
          Decimal("50")
        ;

        ${mintRadGemsOperation.join('\n')}`
    )
  }
