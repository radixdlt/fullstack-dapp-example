import { loadGlossary, loadQuests } from '../src'
;(async () => {
  const el = document.getElementById('glossary')!
  el.innerHTML = `<pre>${JSON.stringify(await loadGlossary('en'), null, 2)}</pre>`
})()
;(async () => {
  const el = document.getElementById('quests')!
  el.innerHTML = `<pre>${JSON.stringify(loadQuests('en'), null, 2)}</pre>`
})()
