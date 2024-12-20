<script lang="ts" context="module">
  import { questApi } from '$lib/api/quest-api'
  import type { QuestId } from 'content'
  import { user } from '../../stores'
  import { get } from 'svelte/store'
  import { useCookies, type RequirementCookieKey } from '$lib/utils/cookies'
  import { okAsync } from 'neverthrow'

  export const completeRequirement = (questId: QuestId, requirementId: string) => {
    return get(user)
      ? questApi.completeRequirement(questId, requirementId)
      : okAsync(
          useCookies(`requirement-${questId}-${requirementId}` as RequirementCookieKey).set(true)
        )
  }
</script>
