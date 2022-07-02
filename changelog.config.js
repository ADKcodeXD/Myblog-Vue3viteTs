module.exports = {
    disableEmoji: false,
    format: '{type}{scope}: {emoji}{subject}',
    list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
    scopes: [],
    types: {
      chore: {
        description: 'Build process or auxiliary tool changes',
        emoji: '🎯',
        value: 'chore'
      },
      ci: {
        description: 'CI related changes',
        emoji: '🎡',
        value: 'ci'
      },
      docs: {
        description: '文档更新',
        emoji: '✏️',
        value: 'docs'
      },
      feat: {
        description: '新功能',
        emoji: '🎉',
        value: 'feat'
      },
      fix: {
        description: '修复bug',
        emoji: '🐛',
        value: 'fix'
      },
      perf: {
        description: 'A code change that improves performance',
        emoji: '⚡️',
        value: 'perf'
      },
      refactor: {
        description: '重构代码或者改变代码结构',
        emoji: '💡',
        value: 'refactor'
      },
      release: {
        description: '发布版',
        emoji: '🏹',
        value: 'release'
      },
      style: {
        description: 'Markup, white-space, formatting, missing semi-colons...',
        emoji: '💄',
        value: 'style'
      },
      test: {
        description: 'Adding missing tests',
        emoji: '💍',
        value: 'test'
      },
      messages: {
        type: 'Select the type of change that you\'re committing:',
        customScope: 'Select the scope this component affects:',
        subject: 'Write a short, imperative mood description of the change:\n',
        body: 'Provide a longer description of the change:\n ',
        breaking: 'List any breaking changes:\n',
        footer: 'Issues this commit closes, e.g #123:',
        confirmCommit: 'The packages that this commit has affected\n',
      },
    }
  };