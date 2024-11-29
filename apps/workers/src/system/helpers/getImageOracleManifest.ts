import {
  Addresses,
  WellKnownAddresses,
  shapeDescription,
  colorDescription,
  shaderDescription,
  ShapeCode,
  ShaderCode,
  ColorCode
} from 'common'
import { config } from '../../config'
import keccak256 from 'keccak256'

export const createRadmorphHash = (value: string) => keccak256(value).toString('hex')

export const radmorphUrlsToTuples = (radmorphs: { id: string; url: string }[]) => {
  return radmorphs
    .map(({ id, url }) => {
      const [shapeCode, shaderCode, color1Code, color2Code] = id.split('_')
      const shape = shapeDescription[shapeCode as ShapeCode]
      const shader = shaderDescription[shaderCode as ShaderCode]
      const color1 = colorDescription[color1Code as ColorCode]
      const color2 = colorDescription[color2Code as ColorCode]
      const urlHash = createRadmorphHash(url)
      const attributesHash = createRadmorphHash(
        `${shape.toLowerCase()}${shader.toLowerCase()}${color1.toLowerCase()}${color2.toLowerCase()}`
      )
      return `Tuple(
        Bytes("${attributesHash}"),
        Bytes("${urlHash}"),
      )`
    })
    .join(',')
}

export const getImageOracleManifest = (radmorphs: { id: string; url: string }[]) => {
  const { accounts, badges, components } = Addresses

  return `
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
    Decimal("100")
  ;

  CALL_METHOD
    Address("${accounts.system.address}")
    "create_proof_of_amount"
    Address("${badges.adminBadgeAddress}") 
    Decimal("1")
  ;

  CALL_METHOD
    Address("${components.imageOracle}")
    "set_key_image_url_hashes"
    Array<Tuple>(
      ${radmorphUrlsToTuples(radmorphs)}
    )
  ;`
}
