# RadQuest dApp

- [RadQuest dApp](#radquest-dapp)
- [Markdown Content](#markdown-content)
  - [Virtual Module](#virtual-module)
  - [Glossary Definition](#glossary-definition)
  - [Quests Definition](#quests-definition)
    - [Quest ID](#quest-id)
    - [Key and Splash images](#key-and-splash-images)
    - [Rewards](#rewards)
    - [Pages](#pages)
      - [Simple pages content definition](#simple-pages-content-definition)
      - [Complex pages content definition](#complex-pages-content-definition)

# Markdown Content

We've custom vite plugins which create virtual modules. You can look for references by searching imports from `virtual:glossary` and `virtual:quests`. These plugins will convert `definiton.json` files during build time into TypeScript objects imported by svelte. Plugins main responsibility is to convert markdown files into HTML string. 

## Virtual Module

[Vite bundler feature](https://vitejs.dev/guide/api-plugin#virtual-modules-convention) - allows passing custom build time information to source files using ESM import syntax. In order to be able to import actual TypeScript code with correct types to svelte files (not just stringified object) we're using TypeScript factory functions. In other words, using mentioned factory functions we're creating AST node which is later printed as valid TypeScript code (which we import in svelte file). Example creation of object using TypeScript factory functions
```
const node = ts.factory.createObjectLiteralExpression([
  ts.factory.createPropertyAssignment('propertyName', ts.factory.createStringLiteral('propertyValue'))
  ts.factory.createPropertyAssignment('another', ts.factory.createNumberLiteral(5))
])
```
printing above node will result in following TypeScript code
```
{ 
  propertyName: 'propertyValue',
  another: 5
}
```

## Glossary Definition

Go to `src/markdown/glossary/en` and edit `definition.json` file. It contains all glossary entries ordered exactly the same as they appear in UI. In order to add new entry, put new object inside array.

```
{
  "title": "Glossary Entry",
  "id": "glossary-md-file-name"
}
```

Later, you need to create md file inside `src/markdown/glossary/en` directory. Markdown file name must match the one you provided inside `id` field. Adding different languages is very similar but you need to create corresponding files inside different directory, e.g. `src/markdown/glossary/es`

## Quests Definition

Go to `src/markdown/quests/en` and edit `definition.json` file. It contains generic definition for every quest - title, description, rewards, images and quest content. Definition object may vary, depending how complex particular quest is. Simplest one, which include only text can look similar to following:

```
  "RadixQuest": {
    "title": "Introduction to Radix",
    "description": "Get familiar with Radar, the radically better Web3 network.",
    "minutesToComplete": 1,
    "pages": [
      "RadixQuest/0.md",
      "RadixQuest/1.md",
      "RadixQuest/2.md",
      "RadixQuest/3.md",
      "RadixQuest/4.md"
    ]
  },
```

On the other hand, you can have a quest with rewards, multiple blocks per page, custom images, custom text for "next" or "previous" action, placeholder content to be replaced in runtime etc. Following example shows more advanced configuration

```
  "RadixWalletQuest": {
    "title": "Set Up Your Radar Wallet",
    "description": "Learn about the Radar Wallet. Install & set up the Wallet app",
    "keyImage": "https://stokenet.radix.com/path-to-key-image.webp",
    "splashImage": "https://stokenet.radix.com/path-to-splash-image.webp",
    "minutesToComplete": 3,
    "rewards": [
      {
        "type": "XRD",
        "amount": 10
      },
      {
        "type": "Fragment",
        "amount": 20
      }
    ],
    "pages": [
      {
        "content": [
          "RadixWalletQuest/0.md",
          { "type": "placeholder", "id": "radix-wallet-input" }
        ],
        "actions": {
          "next": "Cool, next"
        }
      },
      {
        "content": ["RadixWalletQuest/1.md"],
        "actions": {
          "next": "Cool, let's try",
          "prev": "I don't understand"
        }
      }
    ]
  },
```

### Quest ID

Each quest needs unique ID. It is defined inside `definition.json` file as a key for definition object. In above examples `RadixQuest` and `RadixWalletQuest` are IDs for two quests. Quest IDs are used inside the codebase to define:

- split between basic/advanced and order of quests
- default images URLs
- interactive extensions/actions for given quest (e.g. what happens after user has finished the quest)

### Key and Splash images

By default key and splash images URLs are constructed based on quest id using following schema:

- `/quests-images/key/{QUEST_ID}.webp`
- `/quests-images/splash/{QUEST_ID}.webp`

Images are available in this repository under `/apps/dapp/static` directory. If you wish to use different image, override `keyImage` and `splashImage` properties in quest definition - exactly like in advanced example above.

**Note** use absolute URL or make sure you add appropriate image to `/static` directory

### Rewards

Different rewards can be included inside quest definition. In order to do that you need to add entry inside `rewards` array.

```
  "rewards": [
    {
      "type": "XRD",
      "amount": 10
    },
    {
      "type": "Fragment",
      "amount": 20
    }
  ],
```

Supported reward types are defined in `QuestRewardType` type and implemented inside `QuestRewards.svelte` component. Adding new reward type requires updating mentioned files.

### Pages

Quest can have multiple pages, each page can have multiple content blocks. Quest page can be defined either by a simple string (which is a reference to a markdown file) or an object. Object includes text overrides for action buttons (for given page) and content blocks. Each content block can be defined as either a string (which is a reference to a markdown file) or placeholder object. Placeholder objects are needed in order to provide dynamic content inside quest description (e.g. email input, phone input, component address to be copied etc.). Each placeholder **must** have `id` property which will be used in order to replace it with interactive component.

#### Simple pages content definition

Will render two pages with pure markdown content

```
"pages":
  [
    "RadixQuest/0.md",
    "RadixQuest/1.md"
  ]
```

#### Complex pages content definition

Will render two pages: first being purely markdown file with no button overrides. Second will have text overrides for previous/next button and will have three blocks. First block is markdown content, second one is placeholder (which is defined at code level), third is markdown content again.

```
"pages":
  [
    "RadixQuest/0.md",
    {
      "content": [
        "RadixQuest/1-1.md",
        { "type": "placeholder", "id": "radixWalletInput" },
        "RadixQuest/1-2.md",
      ],
      "actions": {
        "next": "Cool, next",
        "prev": "Wait, I need sth"
      }
    }
  ]
```
