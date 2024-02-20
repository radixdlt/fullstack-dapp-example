# RadQuest dApp

- [RadQuest dApp](#radquest-dapp)
  - [Glossary Definition](#glossary-definition)
  - [Quests Definition](#quests-definition)
    - [Quest ID](#quest-id)
    - [Key and Splash images](#key-and-splash-images)
    - [Rewards](#rewards)
    - [Adding a Quest](#adding-a-quest)

## Glossary Definition

Go to `src/glossary` and edit `glossary-definitions.ts` file. It contains all glossary entries ordered exactly the same as they appear in UI.

```
dexes: {
  en: { title: 'DEXes' }
}
```

Later, you need to create md file inside `markdown/glossary/{GlossaryID}/{Language}` directory.

```
├── dapps
│   └── en
│       └── 0.md
└── dexes
    └── en
        └── 0.md
```

## Quests Definition

Go to `src/quests` and edit `quest-definitions.ts` file. It contains definitions for every quest. The definition object may vary, depending how complex particular quest is. Simplest one, which include only text can look similar to following:

```
  ConnectQuest: {
    category: 'Basic',
    rewards: [],
    preRequisites: ['RadixWalletQuest'],
    requirements: [],
    minutesToComplete: 3,
    i18n: {
      en: {
        title: 'Login with Your Radix Wallet',
        description: 'Learn how to use your wallet to log in to dApps on the Radar network.'
      }
    }
  }
```

On the other hand, you can have a complex quest page with a Svelte component. Following example shows a more advanced configuration with a `SmsOtpVerification` component inside of the `ProofOfHuman/en/0.md` quest page.

```
  ProofOfHuman: {
    category: 'Basic',
    rewards: [],
    preRequisites: ['FirstTransactionQuest'],
    requirements: [],
    minutesToComplete: 6,
    i18n: {
      en: {
        title: 'Proof of Human',
        description: 'Verify your phone number to be able to receive XRD tokens.',
        pageOverride: {
          '0.md': {
            content: [
              { type: 'markdown', path: '0.md' },
              { type: 'component', name: 'SmsOtpVerification' }
            ]
          }
        }
      }
    }
  }
```

### Quest ID

Each quest needs unique ID. It is defined inside `src/quests/quest-definitions.ts` file as a key for definition object. In above examples `ConnectQuest` and `ProofOfHuman` are IDs for two quests. Quest IDs are used inside the codebase to define:

- default images URLs
- interactive extensions/actions for given quest (e.g. what happens after user has finished the quest)

### Key and Splash images

By default key and splash images URLs are constructed based on quest id using following schema:

- `/quests-images/key/{QUEST_ID}.webp`
- `/quests-images/splash/{QUEST_ID}.webp`

Images are available in this repository under `/apps/dapp/static` directory. If you wish to use different image, override `keyImage` and `splashImage` properties in quest definition - exactly like in advanced example above.

**Note** use absolute URL or make sure you add appropriate image to `/static` directory

### Rewards

Quest rewards can be included inside the quest definition.

```
  rewards: [
    { name: 'element', amount: 10 }
  ]
```

### Adding a Quest

To add a Quest you need to add an entry in the `src/quests/quest-definitions.ts` object and create a markdown file in `markdown/quests/{QuestId}/{language}/{filename}.md`.

```
# /markdown/quests directory
├── RadixQuest
│   └── en
│       ├── 0.md
│       ├── 1.md
│       ├── 2.md
│       ├── 3.md
│       └── 4.md
├── SendAssetsQuest
│   └── en
│       └── 0.md
└── SwapQuest
    └── en
        ├── 0.md
        ├── 1.md
        └── 2.md
```
