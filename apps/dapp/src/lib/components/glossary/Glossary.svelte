<script lang="ts">
  import { loadGlossary } from 'content'
  import Glossary from './GlossaryUI.svelte'

  const definitionGlossary = loadGlossary('en')
</script>

<Glossary glossary={definitionGlossary} />
