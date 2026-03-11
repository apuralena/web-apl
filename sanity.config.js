import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'A Pura Leña',
  projectId: 'pjb8t9c1',
  dataset: 'production',
  plugins: [structureTool()], // Dejamos solo lo esencial
  schema: {
    types: schemaTypes,
  },
})