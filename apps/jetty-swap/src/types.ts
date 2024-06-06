export type Resource = {
  name: string
  icon: string
  id: string
}

export type SwappedResource = Resource & { count: string }
