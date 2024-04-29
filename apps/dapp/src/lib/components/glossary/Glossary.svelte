<script lang="ts">
  import { loadGlossary } from 'content'
  import Glossary from './GlossaryUI.svelte'
  import { page } from '$app/stores'
  const definitionGlossary = loadGlossary('en')
  $: glossaryAnchor = $page.url.searchParams.get('glossaryAnchor') ?? ''
</script>

<Glossary glossary={definitionGlossary} anchor={glossaryAnchor} on:close />
