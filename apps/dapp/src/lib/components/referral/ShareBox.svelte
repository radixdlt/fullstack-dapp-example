<script lang="ts">
  import Share from '@images/share.svg'
  import { i18n } from '$lib/i18n/i18n'
  import { user } from '../../../stores'

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
    }
  }
</script>

<div class="wrapper">
  <span class="url">
    {url}
  </span>

  <button class="button" on:click={share}>
    <img src={Share} alt={$i18n.t('quests:shareButton')} />

    {$i18n.t(isSharingSupported ? 'quests:shareButton' : 'quests:copy')}
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
    margin: 0 20px;
    font-size: var(--text-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
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
  }
</style>
