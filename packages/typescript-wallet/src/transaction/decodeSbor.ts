import {
  ManifestSborStringRepresentation,
  RadixEngineToolkit
} from '@radixdlt/radix-engine-toolkit'
import { ResultAsync } from 'neverthrow'
import { config } from '../config'
import { typedError } from 'common'

export const decodeSbor = (buffer: Buffer) =>
  ResultAsync.fromPromise(
    RadixEngineToolkit.ManifestSbor.decodeToString(
      buffer,
      config.network.networkId,
      ManifestSborStringRepresentation.ManifestString
    ),
    typedError
  )
