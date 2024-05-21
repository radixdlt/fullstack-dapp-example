<script lang="ts">
  import Input from '../input/Input.svelte'
  import Icon from '../icon/Icon.svelte'

  type Resource = {
    icon: string
    name: string
  }

  export let cardTitle: string
  export let value = ''
  export let resource: Resource
  export let state: 'default' | 'error' = 'default'
</script>

<div class="container">
  <p class="text-label card-title">{cardTitle}</p>
  <div class="input-row">
    <Input style="width: 130px" {state} placeholder="0" bind:value />
    <div class="resource">
      <Icon --size="20px" url={resource.icon} />
      <p class="resource-name">{resource.name}</p>
    </div>
  </div>
  <slot />
</div>

<style lang="scss">
  p {
    padding: 0;
    margin: 0;
  }

  .container {
    height: 8.75rem;
    border-radius: var(--border-radius-xl);
    background: var(--color-white);
    display: flex;
    flex-direction: column;
    gap: 0.4375rem;
    padding: var(--spacing-xl) 1.25rem;
    max-width: 19.375rem;
    min-width: 255px;

    @include desktop {
      width: 100%;
    }
  }

  .card-title {
    color: var(--color-dark);
  }

  .input-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.375rem;
  }

  .error input {
    color: var(--color-error) !important;
  }

  .resource {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .resource-name {
    font-size: var(--text-sm);
    color: var(--color-dark);
    line-height: 24px;
    letter-spacing: 0.01em;
    text-align: center;
  }
</style>
