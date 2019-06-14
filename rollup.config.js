import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy-assets'
import {dirname} from 'path'
import {eslint} from 'rollup-plugin-eslint'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-modify'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import {closeSync, existsSync, mkdirSync, openSync} from 'fs'
import path from 'path'
import pkg from './package.json'
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

const SOURCE_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'dist')
const input = `${SOURCE_DIR}/main.js`

const getBabelOptions = ({useESModules}) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  configFile: path.join(__dirname, './babel.config.js'),
  plugins: ['babel-plugin-annotate-pure-calls', ['@babel/plugin-transform-runtime', {useESModules}]]
})

export default [
  {
    input,
    treeshake: true,
    external: ['react'],
    output: [{dir: DIST_DIR, format: 'cjs'}],
    plugins: [
      progress({
        clearLine: true
      }),
      eslint(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      resolve({
        dedupe: ['react']
      }),
      babel(getBabelOptions({useESModules: false})),
      commonjs(),
      terser(),
      cleanup(),
      copy({
        assets: ['src/assets', 'src/strings', 'src/config.json', 'src/README.MD']
      }),

      // Create an empty app.js script in scripts directory
      {
        name: 'fix',
        buildEnd(err) {
          if (err) return
          mkdirp(path.join(DIST_DIR, 'scripts'))
          closeSync(openSync(path.join(DIST_DIR, 'scripts', 'app.js'), 'w'))
        }
      }
    ]
  }
]
