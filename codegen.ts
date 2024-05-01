import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: ['src/**/*.ts'],
  generates: {
    'src/graphql-types/': {
      preset: 'client',
      plugins: [],
    },
  },
}

// eslint-disable-next-line import/no-default-export
export default config
