<script lang="ts">
  export let email: string
  export const validate = () => !!email && email.includes('@') && email.includes('.')
</script>

<input bind:value={email} class="email-input" placeholder="myaddress@email.com (optional)" />

<style lang="scss">
  .email-input {
    padding: var(--spacing-sm);
    border-bottom: var(--border) black;
    width: 16rem;
  }
</style>
