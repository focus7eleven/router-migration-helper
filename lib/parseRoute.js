'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteParser = function RouteParser() {
  var _this = this;

  (0, _classCallCheck3.default)(this, RouteParser);
  this.importModules = [];
  this.configTree = {};
  this.JSXlevel = 0;

  this.isValidRouteNode = function (name) {
    return ~['Router', 'Route', 'Redirect', 'IndexRoute'].indexOf(name);
  };

  this.parse = function (ast) {
    (0, _babelTraverse2.default)(ast, {
      ImportDeclaration: {
        enter: function enter(path) {
          if (!path.node.specifiers.length) {
            return;
          }
          var importModule = path.node.specifiers[0].local.name;
          var importModulePath = path.node.source.value;
          _this.importModules.push({ name: importModule, path: importModulePath });
        }
      },

      JSXElement: {
        enter: function enter(path) {
          _this.JSXlevel++;
        },
        exit: function exit(path) {
          _this.JSXlevel--;
        }
      },

      JSXOpeningElement: {
        enter: function enter(path) {
          var nodeName = path.node.name;
          if (!_this.isValidRouteNode(nodeName.name)) {
            return;
          }
          var routeNode = {};
          if (t.isJSXIdentifier(nodeName)) {
            routeNode = {
              path: '',
              component: '',
              indexRoute: {},
              routes: []
            };
          }
          if (_this.JSXlevel === 1) {
            _this.configTree = routeNode;
            path.parent.__routeNode = routeNode;
          } else if (_this.JSXlevel > 1) {
            path.parent.__routeNode = routeNode;
            var parentRouteNode = path.parentPath.parentPath.node.__routeNode;
            if (!parentRouteNode.routes) {
              parentRouteNode.routes = [];
            }
            if (nodeName.name !== 'IndexRoute') {
              // 排除 indexRoute
              parentRouteNode.routes.push(routeNode);
            }
          }
        }
      },

      JSXAttribute: function JSXAttribute(path) {
        var node = path.node;

        var elementKey = path.parent.name.name;
        if (!_this.isValidRouteNode(elementKey)) {
          return;
        }
        var key = node.name.name;
        var value = _this.getPropValue(node.value);
        var parent = void 0;
        var parentRouteNode = void 0;
        if (elementKey === 'IndexRoute') {
          parent = path.parentPath.findParent(function (path) {
            return t.isJSXElement(path.node);
          });
          parentRouteNode = parent.parent.__routeNode;
          if (!parentRouteNode.indexRoute) {
            parentRouteNode.indexRoute = {};
          }
          parentRouteNode.indexRoute[key] = value;
        } else if (elementKey === 'Redirect') {
          parent = path.findParent(function (path) {
            return t.isJSXElement(path.node);
          });
          parentRouteNode = parent.node.__routeNode;
          if (key === 'from') {
            parentRouteNode.path = value;
          } else if (key === 'to') {
            parentRouteNode.redirect = value;
          }
        } else {
          parent = path.findParent(function (path) {
            return t.isJSXElement(path.node);
          });
          parentRouteNode = parent.node.__routeNode;
          parentRouteNode[key] = value;
        }
      }
    });

    _this.cleanUp(_this.configTree);

    return _this.configTree;
  };

  this.getPropValue = function (node) {
    var value = void 0;
    if (t.isJSXExpressionContainer(node)) {
      // 参数是表达式
      var expression = node.expression;
      var code = (0, _babelGenerator2.default)(expression).code;
      value = code;
    } else {
      // 参数是纯字符串
      value = node ? node.value : true;
    }
    return value;
  };

  this.cleanUp = function (route) {
    if (route) {
      if (!(0, _keys2.default)(route.indexRoute).length) {
        delete route.indexRoute;
      } else if (route.indexRoute.component) {
        var componentUrl = _this.importModules.find(function (v) {
          return v.name === route.indexRoute.component;
        });
        route.indexRoute.component = componentUrl ? componentUrl.path : route.component;
        // route.indexRoute.component = route.component
      }
      if (!(0, _keys2.default)(route.component).length) {
        delete route.component;
      } else {
        var _componentUrl = _this.importModules.find(function (v) {
          return v.name === route.component;
        });
        route.component = _componentUrl ? _componentUrl.path : route.component;
        // route.component = route.component
      }
      if (route.routes.length) {
        // 遍历子 routes
        return route.routes.forEach(function (v) {
          return _this.cleanUp(v);
        });
      } else {
        // 删除空 routes 属性
        delete route.routes;
        return;
      }
    } else {
      return;
    }
  };
};

var parser = new RouteParser();

exports.default = parser;