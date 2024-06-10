<script lang="ts">
  import JettyActionButtons from '$lib/components/quest/JettyActionButtons.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let text: string
  export let onBack: () => void
  export let completeQuest: () => void
</script>

{@html text}

<JettyActionButtons
  nextText={$i18n.t('quests:completeQuest')}
  on:back={onBack}
  on:next={completeQuest}
/>
