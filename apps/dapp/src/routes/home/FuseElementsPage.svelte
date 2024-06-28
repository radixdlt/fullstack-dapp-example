<script lang="ts">
  export let singleAction = false
</script>

<div class="fuse-elements-page">
  <div>
    <slot name="content" />
  </div>

  <div class:single-action={singleAction}>
    <slot name="actions" />
  </div>
</div>

<style>
  .fuse-elements-page {
    color: var(--color-light);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .single-action {
    display: flex;
    justify-content: center;
  }
</style>
