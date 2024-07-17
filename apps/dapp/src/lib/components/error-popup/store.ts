import { writable } from 'svelte/store'

export const ErrorPopupId = {
  XrdRewardLimit: 'XrdRewardLimit'
} as const

export type ErrorPopupId = (typeof ErrorPopupId)[keyof typeof ErrorPopupId]

export type ErrorPopup = {
  id: ErrorPopupId
}

export const errorPopupStore = writable<ErrorPopup | undefined>(undefined)
