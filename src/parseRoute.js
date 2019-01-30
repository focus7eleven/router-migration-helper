import * as t from 'babel-types'
import generate from 'babel-generator';
import traverse from "babel-traverse"

class RouteParser {

  importModules = []

  configTree = {}

  JSXlevel = 0

  isValidRouteNode = name => ~['Router', 'Route', 'Redirect', 'IndexRoute'].indexOf(name)

  parse = ast => {
    traverse(ast, {
      ImportDeclaration: {
        enter: path => {
          if (!path.node.specifiers.length) {
            return
          }
          const importModule = path.node.specifiers[0].local.name
          const importModulePath = path.node.source.value
          this.importModules.push({ name: importModule, path: importModulePath })
        }
      },

      JSXElement: {
        enter: (path) => {
          this.JSXlevel++
        },
        exit: (path) => {
          this.JSXlevel--
        }
      },
    
      JSXOpeningElement: {
        enter: path => {
          const nodeName = path.node.name;
          if (!this.isValidRouteNode(nodeName.name)) {
            return
          }
          let routeNode = {}
          if (t.isJSXIdentifier(nodeName)) {
            routeNode = {
              path: '',
              component: '',
              indexRoute: {},
              routes: []
            }
          }      
          if (this.JSXlevel === 1) {
            this.configTree = routeNode
            path.parent.__routeNode = routeNode;
          } else if (this.JSXlevel > 1) {
            path.parent.__routeNode = routeNode;
            let parentRouteNode = path.parentPath.parentPath.node.__routeNode;
            if(!parentRouteNode.routes) {
              parentRouteNode.routes = []
            }
            if (nodeName.name !== 'IndexRoute') {
              // 排除 indexRoute
              parentRouteNode.routes.push(routeNode)
            }
          }
        }
      },
    
      JSXAttribute: (path) => {
        const { node } = path
        const elementKey = path.parent.name.name
        if (!this.isValidRouteNode(elementKey)) {
          return
        }
        const key = node.name.name
        const value = this.getPropValue(node.value)
        let parent
        let parentRouteNode
        if (elementKey === 'IndexRoute') {
          parent = path.parentPath.findParent(path =>  t.isJSXElement(path.node))
          parentRouteNode = parent.parent.__routeNode
          if (!parentRouteNode.indexRoute) {
            parentRouteNode.indexRoute = {}
          }
          parentRouteNode.indexRoute[key] = value
        } else if (elementKey === 'Redirect') {
          parent = path.findParent(path =>  t.isJSXElement(path.node))
          parentRouteNode = parent.node.__routeNode
          if (key === 'from') {
            parentRouteNode.path = value
          } else if (key === 'to') {
            parentRouteNode.redirect = value
          }
        } else {
          parent = path.findParent(path =>  t.isJSXElement(path.node))
          parentRouteNode = parent.node.__routeNode
          parentRouteNode[key] = value
        }
      }
    })

    this.cleanUp(this.configTree)

    return this.configTree
  }

  getPropValue = node => {
    let value
    if (t.isJSXExpressionContainer(node)) {
      // 参数是表达式
      const expression = node.expression;
      const code = generate(expression).code
      value = code
    } else {
      // 参数是纯字符串
      value = node ? node.value : true;
    }
    return value;
  }

  cleanUp = route => {
    if (route) {
      if (!Object.keys(route.indexRoute).length) {
        delete route.indexRoute
      } else if (route.indexRoute.component) {
        const componentUrl = this.importModules.find(v => v.name === route.indexRoute.component)
        route.indexRoute.component = componentUrl ? componentUrl.path : route.component
        // route.indexRoute.component = route.component
      }
      if (!Object.keys(route.component).length) {
        delete route.component
      } else {
        const componentUrl = this.importModules.find(v => v.name === route.component)
        route.component = componentUrl ? componentUrl.path : route.component
        // route.component = route.component
      }
      if (route.routes.length) {
        // 遍历子 routes
        return route.routes.forEach(v => this.cleanUp(v))
      } else {
        // 删除空 routes 属性
        delete route.routes
        return
      }
    } else {
      return
    }
  }
}
 
const parser = new RouteParser()

export default parser
