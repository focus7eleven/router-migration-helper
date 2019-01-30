'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _babylon = require('babylon');

var _parseRoute = require('./parseRoute');

var _parseRoute2 = _interopRequireDefault(_parseRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv.slice(2);
var file = _fs2.default.readFileSync(args[0], 'utf-8');

var defaultOptions = {
  sourceType: 'module',
  plugins: ['jsx', 'objectRestSpread']
};

var ast = (0, _babylon.parse)(file, defaultOptions);

var routeTree = _parseRoute2.default.parse(ast);

_fs2.default.writeFile('result.js', 'export default ' + (0, _stringify2.default)(routeTree.routes[0], null, 2), function (err) {
  if (err) throw err;
  console.log('Result has been saved to result.js');
});