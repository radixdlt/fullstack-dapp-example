<script lang="ts">
  import CopyIcon from '@images/copy.svg'
  import Icon from '../icon/Icon.svelte'
  import { i18n } from '$lib/i18n/i18n'

  export let text: string

  let hasCopied = false

  const copy = () => {
    navigator.clipboard.writeText(text)
    hasCopied = true
    setTimeout(() => {
      hasCopied = false
    }, 5000)
  }
</script>

<div class="copy-text-box" class:text-faded={hasCopied}>
  <div class="text white-text">
    {text}
  </div>

  <button class="copy-btn" on:click={copy}>
    <Icon url={CopyIcon}>
      <div class="white-text">
        {hasCopied
          ? $i18n.t('quests:TransferTokens.copyTextButton_copied')
          : $i18n.t('quests:TransferTokens.copyTextButton_copy')}
      </div>
    </Icon>
  </button>
</div>

<style lang="scss">
  .copy-text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg) var(--spacing-xl);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-3xl);
    background: var(--color-primary);
  }

  .text {
    display: flex;
    align-items: center;
  }

  .white-text {
    color: var(--color-light);
  }

  .copy-btn {
    width: 6rem;
  }
</style>
