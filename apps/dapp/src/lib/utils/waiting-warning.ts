import { ErrorPopupId, errorPopupStore } from '../../stores'

let timeout: NodeJS.Timeout

export const waitingWarning = (condition: boolean) => {
  if (condition) {
    timeout = setTimeout(() => {
      errorPopupStore.set({
        id: ErrorPopupId.HighDemand
      })
    }, 30_000)
  } else {
    clearTimeout(timeout)
  }
}
