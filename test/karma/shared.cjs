const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

function legacyConfig () {
  return {
    basePath: '',
    frameworks: ['chai', 'mocha'],
    files: [
      '../../index.js',
      '../*.legacy.test.js'
    ],
    exclude: [],
    preprocessors: {
      '../../index.js': ['rollup'],
      '../*.test.js': ['rollupTests']
    },
    rollupPreprocessor: {
      output: {
        format: 'iife',
        name: 'jsLib',
        sourcemap: 'inline'
      }
    },
    customPreprocessors: {
      rollupTests: {
        base: 'rollup',
        options: {
          plugins: [
            commonjs(),
            nodeResolve()
          ]
        }
      }
    },
    plugins: ['karma-*'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: [],
    singleRun: false,
    concurrency: Infinity
  }
}

function modernConfig () {
  const c = legacyConfig()
  c.files = c.files.concat([
    '../*.modern.test.js'
  ])
  c.preprocessors['../*.modern.test.js'] = ['rollupTests']
  return c
}

module.exports = { modernConfig, legacyConfig }
