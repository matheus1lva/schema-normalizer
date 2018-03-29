const babel = require('rollup-plugin-babel');
import uglify from 'rollup-plugin-uglify';

export default [{
  input: './index.js',
  output: {
    file: 'main.cjs.js',
    format: 'cjs'
  },
  plugins: [babel(), uglify()]
}];