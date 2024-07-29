<script lang="ts">
  import Share from '@images/share.svg'
  import { i18n } from '$lib/i18n/i18n'
  import { user } from '../../../stores'

  let copied = false
  const url =
    typeof window === 'undefined' ? '' : `${window.location.origin}/?ref=${$user?.referralCode}`
  const isSharingSupported = typeof navigator !== 'undefined' && !!navigator.share

  const share = async () => {
    if (isSharingSupported) {
      await navigator.share({
        url,
        title: 'RadQuest'
      })
    } else {
      navigator.clipboard.writeText(url)
      copied = true
      setTimeout(() => {
        copied = false
      }, 3000)
    }
  }
</script>

<div class="wrapper">
  <span class="url">
    {url}
  </span>

  <button class="button" on:click={share}>
    {#if !copied}
      <img src={Share} alt={$i18n.t('quests:shareButton')} />
    {/if}
    {isSharingSupported ? $i18n.t('quests:shareButton') : ''}
    {!isSharingSupported && !copied ? $i18n.t('quests:copy') : ''}
    {!isSharingSupported && copied ? $i18n.t('quests:copied') : ''}
  </button>
</div>

<style lang="scss">
  .wrapper {
    max-width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 16px 0px #00000033;
    border-radius: 40px;
    background: #fff;
    margin: 0 0.5rem;
  }

  .url {
    background: #fff;
    margin: 0 0.5rem 0 1rem;
    font-size: var(--text-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .button {
    padding: 0.5rem 1rem 0.5rem 0.8rem;
    gap: 10px;
    border-radius: 0px 40px 40px 0px;
    background: var(--color-primary);
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: auto;
    flex-shrink: 0;
    justify-content: center;
    width: 6rem;
    @include desktop {
      @media (hover: hover) {
        &:hover:not(.disabled) {
          filter: brightness(0.8);
        }
      }
    }
    transition: filter 0.2s ease-in-out;
  }
</style>
