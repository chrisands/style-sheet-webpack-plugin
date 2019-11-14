import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: {
    dir: './lib',
    format: 'commonjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
