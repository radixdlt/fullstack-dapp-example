<script lang="ts">
  export let currentPage: number
  export let totalPages: number
  export let set: (page: number) => void
</script>

<div class="pagination">
  {#each Array(totalPages).fill(0) as _, i}
    <button class="page-button" disabled={i === currentPage} on:click={() => set(i)}>
      {i + 1}
    </button>
  {/each}
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
