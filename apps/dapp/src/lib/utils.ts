import { getContext, setContext } from 'svelte'
import XRDIcon from '@images/xrd.png'
import PurpleCardIcon from '@images/purple-card.svg'
import FragmentIcon from '@images/fragment.png'

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

export const typeToIcon: Record<string, string> = {
  xrd: XRDIcon,
  element: FragmentIcon,
  'Purple Card': PurpleCardIcon
}
