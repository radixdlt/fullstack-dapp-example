import type { ParamMatcher } from '@sveltejs/kit'
import { QuestCategory } from 'content'

export const match: ParamMatcher = (param) =>
  Object.values(QuestCategory)
    .map((category) => category.toLowerCase())
    .includes(param)
