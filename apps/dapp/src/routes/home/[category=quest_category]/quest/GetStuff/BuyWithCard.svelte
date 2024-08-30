<script lang="ts">
  import Button from '$lib/components/button/Button.svelte'
  import { i18n } from '$lib/i18n/i18n'
</script>

<div class="buy-with-xrd">
  <slot />

  <Button>{$i18n.t('quests:GetStuff.buyXRDButton')}</Button>
</div>
