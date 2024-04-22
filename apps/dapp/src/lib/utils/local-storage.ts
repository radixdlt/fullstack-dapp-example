import { type QuestId } from 'content'

type LocalStorageEntry<K, V> = {
  key: K
  value: V
}

export const useLocalStorage = <
  T extends
    | LocalStorageEntry<'savedProgress', { questId: QuestId; progress: number }>
    | LocalStorageEntry<'seen-landing-popup', boolean>,
  V extends T['key']
>(
  item: V
) => ({
  set: (value: Extract<T, { key: V }>['value']) =>
    localStorage.setItem(item, JSON.stringify(value)),
  get: () => {
    if (!item) return undefined
    const loadedValue = localStorage.getItem(item)
    return loadedValue ? (JSON.parse(loadedValue) as Extract<T, { key: V }>['value']) : undefined
  },
  clear: () => localStorage.removeItem(item)
})
