import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import {dirname, join, resolve} from 'path'
import {eslint} from 'rollup-plugin-eslint'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-modify'
import nodeResolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import {closeSync, existsSync, mkdirSync, openSync} from 'fs'
const mkdirp = path => {
  if (existsSync(path)) {
    return
  }
  const parentDir = dirname(path)
  if (!existsSync(parentDir)) {
    mkdirp(parentDir)
  }
  mkdirSync(path)
}

const SOURCE_DIR = resolve(__dirname, 'src')
const DIST_DIR = resolve(__dirname, 'dist')
const input = `${SOURCE_DIR}/main.js`

const getBabelOptions = ({useESModules}) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  configFile: join(__dirname, './babel.config.js'),
  plugins: [
    'babel-plugin-annotate-pure-calls',
    ['@babel/plugin-transform-runtime', {useESModules}]
  ]
})

export default [
  {
    input,
    treeshake: true,
    // external: ['react', 'react-jsbox'],
    output: [{dir: DIST_DIR, format: 'cjs'}],
    plugins: [
      progress({
        clearLine: true
      }),
      eslint(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      nodeResolve({
        dedupe: ['react']
      }),
      babel(getBabelOptions({useESModules: false})),
      commonjs(),
      terser(),
      cleanup(),
      copy({
        targets: [
          {src: 'src/assets/*', dest: 'dist/assets'},
          {src: 'src/strings/*', dest: 'dist/strings'},
          {src: 'src/config.json', dest: 'dist/'},
          {src: 'src/README.MD', dest: 'dist/'},
          {src: 'src/scripts/*', dest: 'dist/scripts/'}
        ]
      })

      // Create an empty app.js script in scripts directory
      // {
      //   name: 'fix',
      //   buildEnd(err) {
      //     if (err) return
      //     mkdirp(join(DIST_DIR, 'scripts'))
      //     closeSync(openSync(join(DIST_DIR, 'scripts/app.js'), 'w'))
      //   }
      // }
    ]
  }
]
