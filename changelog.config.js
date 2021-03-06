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
      emoji: '๐ฏ',
      value: 'chore'
    },
    ci: {
      description: 'CI related changes',
      emoji: '๐ก',
      value: 'ci'
    },
    docs: {
      description: 'ๆๆกฃๆดๆฐ',
      emoji: 'โ๏ธ',
      value: 'docs'
    },
    feat: {
      description: 'ๆฐๅ่ฝ',
      emoji: '๐',
      value: 'feat'
    },
    fix: {
      description: 'ไฟฎๅคbug',
      emoji: '๐',
      value: 'fix'
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: 'โก๏ธ',
      value: 'perf'
    },
    refactor: {
      description: '้ๆไปฃ็ ๆ่ๆนๅไปฃ็ ็ปๆ',
      emoji: '๐ก',
      value: 'refactor'
    },
    release: {
      description: 'ๅๅธ็',
      emoji: '๐น',
      value: 'release'
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '๐',
      value: 'style'
    },
    test: {
      description: 'Adding missing tests',
      emoji: '๐',
      value: 'test'
    },
    messages: {
      type: "Select the type of change that you're committing:",
      customScope: 'Select the scope this component affects:',
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
      breaking: 'List any breaking changes:\n',
      footer: 'Issues this commit closes, e.g #123:',
      confirmCommit: 'The packages that this commit has affected\n'
    }
  }
};
