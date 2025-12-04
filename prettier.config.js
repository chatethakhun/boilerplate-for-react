// @ts-check
/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  jsxSingleQuote: true,
  bracketSameLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
