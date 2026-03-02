// Outputs:
//  - dist/dom-id.js       (ESM + sourcemap)
//  - dist/dom-id.min.js   (ESM minified)
//  - dist/dom-id.cjs      (CommonJS)
//
// Zero deps. Modern target.

import { build } from 'esbuild'
import { rmSync, mkdirSync } from 'node:fs'

const SRC = 'src/dom-id.js'
const OUT_DIR = 'dist'
const TARGET = 'es2020'

const formats = {
  esm: 'esm',
  cjs: 'cjs'
}

rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR)

const baseConfig = {
  entryPoints: [SRC],
  bundle: false,
  target: TARGET
}

const out = name => `${OUT_DIR}/${name}`

const buildVariant = options =>
  build({ ...baseConfig, ...options })

await Promise.all([
  buildVariant({
    outfile: out('dom-id.js'),
    format: formats.esm,
    sourcemap: true
  }),

  buildVariant({
    outfile: out('dom-id.min.js'),
    format: formats.esm,
    minify: true
  }),

  buildVariant({
    outfile: out('dom-id.cjs'),
    format: formats.cjs,
    sourcemap: true
  })
])

console.log(`✓ Built ${OUT_DIR}/`)