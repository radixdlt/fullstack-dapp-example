import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'
import type { Resource } from '../../types'
import Clam from '../../images/clam.png'
import Element from '../../images/fragment.png'

export const entityToResource =
  (clamAddress: string) => (entity: StateEntityMetadataPageResponse) => {
    let resource: Resource = {} as Resource

    resource.id = entity.address
    let nameItem = entity.items.find((item) => item.key === 'name')
    let iconItem = entity.items.find((item) => item.key === 'icon_url')
    //todo remove once CLAMS/ELEMENTS have urls
    resource.icon = resource.id === clamAddress ? Clam : Element
    if (nameItem?.value.typed.type === 'String') resource.name = nameItem.value.typed.value
    if (iconItem?.value.typed.type === 'Url') resource.icon = iconItem.value.typed.value

    return resource
  }
