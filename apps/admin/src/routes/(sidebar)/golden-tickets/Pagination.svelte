<script lang="ts">
  export let currentPage: number
  export let totalPages: number
  export let set: (page: number) => void

  let pageStart = 1
</script>

<div class="pagination">
  {#if pageStart > 1}
    <button class="page-button" on:click={() => (pageStart -= 10)}>...</button>
  {/if}
  {#each Array(Math.min(10, totalPages - pageStart + 1)).fill(0) as _, i}
    <button
      class="page-button"
      disabled={pageStart + i === currentPage}
      on:click={() => set(pageStart + i)}
    >
      {pageStart + i}
    </button>
  {/each}
  {#if pageStart + 10 <= totalPages}
    <button class="page-button" on:click={() => (pageStart += 10)}>...</button>
  {/if}
</div>

<style>
  .pagination {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }

  .page-button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
  }

  .page-button[disabled] {
    color: gray;
  }
</style>
