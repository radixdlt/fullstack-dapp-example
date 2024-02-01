import { getContext, setContext } from 'svelte'

export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    globalThis.navigator ? globalThis.navigator.userAgent : ''
  )

export const useContext = <
  Contexts extends Record<string, Values>,
  Values = Contexts[keyof Contexts]
>() => ({
  set: <Name extends keyof Contexts>(name: Name, value: Contexts[Name]) =>
    setContext<Contexts[typeof name]>(name, value),
  get: <Name extends keyof Contexts>(name: Name) => getContext<Contexts[typeof name]>(name)
})
