import fs from 'fs'
import { parse } from 'babylon';
import RouteParser from './parseRoute'

const args = process.argv.slice(2)
const file = fs.readFileSync(args[0], 'utf-8')


const defaultOptions = {
  sourceType: 'module',
  plugins: ['jsx', 'objectRestSpread']
};

const ast = parse(file, defaultOptions);

const routeTree = RouteParser.parse(ast)

fs.writeFile('result.js', `export default ${JSON.stringify(routeTree.routes[0], null, 2)}`, err => {
  if (err) throw err;
  console.log('Result has been saved to result.js')
})