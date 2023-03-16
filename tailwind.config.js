module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  whitelistPatterns: [/el-.+$/],
  whitelistPatternsChildren: [/el-.+$/],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  prefix: 'tw-',
  corePlugins: {
    preflight: false
  }
}
