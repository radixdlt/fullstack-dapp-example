<script lang="ts">
  export let email: string
</script>

<input
  bind:value={email}
  on:change
  on:input
  class="email-input"
  placeholder="myaddress@email.com (optional)"
  on:blur
/>

<style lang="scss">
  .email-input {
    padding: var(--spacing-sm);
    border-bottom: var(--border) black;
    width: 16rem;
  }
</style>
