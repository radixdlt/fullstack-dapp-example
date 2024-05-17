<script lang="ts">
  import { i18n } from '$lib/i18n/i18n'
</script>

<section>
  <p class="radquest-info">{$i18n.t('main:radquest-info')}</p>
</section>

<style>
  section {
    display: flex;
    max-width: 768px;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .radquest-info {
    text-align: center;
    width: 100vw;
    font-family: var(--font-main);
    font-size: var(--text-sm);
    font-style: normal;
    font-weight: var(--font-weight-light);
    letter-spacing: 0.16px;
  }
</style>
