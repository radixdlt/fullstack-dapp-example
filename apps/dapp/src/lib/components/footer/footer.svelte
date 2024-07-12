<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
  import Youtube from '$lib/components/social-icons/Youtube.svelte'
  import Xcom from '$lib/components/social-icons/Xcom.svelte'
  import Discord from '$lib/components/social-icons/Discord.svelte'
  import Telegram from '$lib/components/social-icons/Telegram.svelte'
  import ExternalLink from '$lib/components/externalLink/ExternalLink.svelte'
  import RunsOnRadix from '@images/runs-on-radix.svg'
  import Facebook from '../social-icons/Facebook.svelte'
  import Reddit from '../social-icons/Reddit.svelte'
  import Github from '../social-icons/Github.svelte'
  import Medium from '../social-icons/Medium.svelte'
  import Linkedin from '../social-icons/Linkedin.svelte'

  const { social, radixDlt } = {
    social: {
      discord: 'https://discord.com/invite/radixdlt',
      facebook: 'https://www.facebook.com/RadixDLT/',
      github: 'https://github.com/radixdlt',
      medium: 'https://radixdlt.medium.com/',
      reddit: 'https://www.reddit.com/r/Radix/',
      telegram: 'https://t.me/radix_dlt',
      x: 'https://x.com/RadixDLT',
      youtube: 'https://www.youtube.com/c/radixdlt',
      linkedin: 'https://www.linkedin.com/company/radixdlt'
    },
    radixDlt: {
      url: 'https://www.radixdlt.com'
    }
  }

  const iconHoverColor = 'var(--color-primary)'
  $: radixDltHover = false

  const socials = [
    { link: social.discord, Icon: Discord },
    { link: social.facebook, Icon: Facebook },
    { link: social.github, Icon: Github },
    { link: social.medium, Icon: Medium },
    { link: social.reddit, Icon: Reddit },
    { link: social.telegram, Icon: Telegram },
    { link: social.x, Icon: Xcom },
    { link: social.youtube, Icon: Youtube },
    { link: social.linkedin, Icon: Linkedin }
  ]
</script>

<footer>
  <div class="links-footer">
    <div class="links-col">
      <p class="text-bold learn-more">{$i18n.t('main:footer.learn-more')}</p>
      <a
        on:mouseenter={() => (radixDltHover = true)}
        on:mouseleave={() => (radixDltHover = false)}
        class="radix-dlt-link"
        target="_blank"
        href={radixDlt.url}
      >
        Radix DLT
        <ExternalLink
          --fill={radixDltHover ? 'var(--color-primary)' : 'var(--color-background-dark)'}
        />
      </a>
    </div>
    <div class="links-col mobile-link-margin">
      <p class="text-bold">{$i18n.t('main:footer.join-radix')}</p>
      <div class="icon-links">
        {#each socials as { Icon, link }}
          <a href={link} target="_blank">
            <Icon --cursor="pointer" --hover-fill={iconHoverColor} />
          </a>
        {/each}
      </div>
    </div>
    <a href={radixDlt.url} class="runs-on-radix mobile-link-margin">
      <img src={RunsOnRadix} alt={$i18n.t('main:footer.runs-on-radix-alt')} />
    </a>
  </div>
  <div class="lower-footer">
    <p class="copyright">
      &#9426;
      {$i18n.t('main:footer.all-rights')}
    </p>
    <a class="privacy-notice" target="_blank" href={`${radixDlt.url}/privacy-policy`}
      >{$i18n.t('main:footer.privacy-notice')}</a
    >
  </div>
</footer>

<style lang="scss">
  a {
    &:hover {
      color: var(--color-primary);
    }
  }
  p {
    padding: 0;
    margin: 0;
    font-size: var(--text-xs);
  }
  footer {
    margin-top: 5.188rem;

    @media (max-width: 880px) {
      margin-top: 1.5rem;
    }
  }

  .lower-footer {
    padding: 32px 24px 23px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }

  .links-footer {
    padding: 0px 1.5rem 1.813rem 1.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 880px) {
      flex-direction: column;
      flex-wrap: wrap;
    }
  }

  .links-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.938rem;

    @media (max-width: 880px) {
      align-items: flex-start;
    }
  }

  .mobile-link-margin {
    @media (max-width: 880px) {
      margin-top: 24px;
    }
  }

  .icon-links {
    display: flex;
    gap: var(--spacing-xl);

    @media (max-width: 880px) {
      gap: var(--spacing-xs);
      width: 13rem;
      flex-wrap: wrap;
      row-gap: 0.725rem;
    }
  }

  .learn-more {
    text-align: left;
    width: 100%;
  }

  .radix-dlt-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--text-md);
  }

  .privacy-notice {
    font-size: var(--text-xs);
  }
</style>
