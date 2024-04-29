<script lang="ts">
  import { loadGlossary } from 'content'
  import Glossary from './GlossaryUI.svelte'

  // Pass anchor to automatically select glossary definition
  export let glossaryAnchor = ''
  const definitionGlossary = loadGlossary('en')
</script>

<Glossary glossary={definitionGlossary} anchor={glossaryAnchor} on:close />
