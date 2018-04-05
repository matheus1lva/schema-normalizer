const babel = require('rollup-plugin-babel');
import uglify from 'rollup-plugin-uglify';

export default [{
  input: './index.js',
  output: {
    file: 'dist/main.cjs.js',
    format: 'cjs'
  },
  plugins: [babel(), uglify()]
},
{
  input: './index.js',
  output: {
    file: 'dist/main.es.js',
    format: 'es'
  },
  plugins: [babel(), uglify()]
}];