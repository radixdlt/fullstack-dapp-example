export function splitArrayIntoChunks<T>(array: T[], chunk_size: number): T[][] {
  if (array.length == 0) return []

  return [array.splice(0, chunk_size)].concat(splitArrayIntoChunks(array, chunk_size))
}
