### TODO
- deal with splat
- deal with baseUrl replacement


### Try out
install

```bash
npm install -g react-router-migration-helper
```

migrate ( ⚠️: Do not misspell the command by rm )

```
rrm ./router.js

# the result will show in result.js
```


### Demo
```javascript
import Layout from './routes/Layout';
import Projects from './routes/Dashboard/Projects';

export default (
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={Projects} navPathEnd="dashboard/projects" />
      <Route
        path="dashboard"
        breadcrumbName="dashboard"
        navPathEnd="dashboard/projects"
      >
        <IndexRoute component={Projects} />
        <Route path="projects" breadcrumbName="projects" component={Projects}>
          <IndexRoute breadcrumbName="your" />
          <Route path="starred" breadcrumbName="starred" />
          <Route path="all" breadcrumbName="all" />
        </Route>
      </Route>
    </Route>
  </Router>
)
```

result.js:

```javascript
export default {
  "path": "/",
  "component": "./routes/Layout",
  "indexRoute": {
    "component": "./routes/Dashboard/Projects",
    "navPathEnd": "dashboard/projects"
  },
  "routes": [
    {
      "path": "dashboard",
      "indexRoute": {
        "component": "./routes/Dashboard/Projects"
      },
      "routes": [
        {
          "path": "projects",
          "component": "./routes/Dashboard/Projects",
          "indexRoute": {
            "breadcrumbName": "your"
          },
          "routes": [
            {
              "path": "starred",
              "breadcrumbName": "starred"
            },
            {
              "path": "all",
              "breadcrumbName": "all"
            }
          ],
          "breadcrumbName": "projects"
        }
      ],
      "breadcrumbName": "dashboard",
      "navPathEnd": "dashboard/projects"
    }
  ]
}
```