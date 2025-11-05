//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  { parserOptions: { project: ['tsconfig.json'] } },
]
