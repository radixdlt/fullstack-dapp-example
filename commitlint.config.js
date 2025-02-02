module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': () => [0, 'always', 150],
    'scope-enum': () => [
      2,
      'always',
      [
        'dapp',
        'notification',
        'stream',
        'workers',
        'db',
        'wallet',
        'core',
        'common',
        'admin',
        'content',
        'markdown',
        'multiple',
        'scrypto',
        'queues',
        'integration',
        'jetty-swap'
      ]
    ],
    'scope-empty': [2, 'never'],
    'type-enum': () => [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'code',
        'quest'
      ]
    ],
  },
  ignores: [
    (message) => message.toLowerCase().includes('wip')
  ],
  defaultIgnores: true
}
