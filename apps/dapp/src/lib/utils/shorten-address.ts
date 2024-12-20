export const shortenAddress = (address?: string, maxNftIdLength = 18): string => {
  if (address?.includes(':')) {
    const [resourceAddress, nftID] = address.split(':')
    return `${shortenAddress(resourceAddress)}:${shortenNftID(nftID, maxNftIdLength)}`
  }

  return address
    ? `${address.slice(0, 4)}…${address.slice(address.length - 6, address.length)}`
    : ''
}

export const shortenNftID = (id: string, maxNftIdLength = 18) => {
  if (id.startsWith('{')) {
    return `${id.slice(0, 5)}…${id.slice(id.length - 5, id.length)}`
  }

  const difference = id.length - maxNftIdLength
  const halfDifference = Math.floor(difference / 2)
  const halfLength = Math.floor(id.length / 2)
  return difference <= 0
    ? id
    : `${id.slice(0, halfLength - halfDifference)}…${id.slice(
        halfLength + halfDifference,
        id.length
      )}`
}
