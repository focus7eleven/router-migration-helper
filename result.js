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
        },
        {
          "path": "activity",
          "component": "./routes/Dashboard/Activities",
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
          "breadcrumbName": "Activity"
        },
        {
          "path": "pull_requests",
          "component": "./routes/Dashboard/PullRequests",
          "breadcrumbName": "PullRequests"
        },
        {
          "path": "groups",
          "component": "./routes/Dashboard/Groups",
          "breadcrumbName": "groups"
        }
      ],
      "breadcrumbName": "dashboard",
      "navPathEnd": "dashboard/projects"
    },
    {
      "path": "search",
      "component": "./routes/Search",
      "breadcrumbName": "search",
      "navPathEnd": "search"
    },
    {
      "path": "codesearch",
      "component": "./routes/Codesearch",
      "breadcrumbName": "codesearch",
      "navPathEnd": "codesearch"
    },
    {
      "path": "groups/new",
      "component": "./routes/Group/New",
      "breadcrumbName": "new",
      "navPathEnd": "dashboard/projects"
    },
    {
      "path": "projects/new",
      "component": "./routes/Project/New",
      "breadcrumbName": "new",
      "navPathEnd": "dashboard/projects"
    },
    {
      "path": "404",
      "component": "./routes/NotFound",
      "breadcrumbName": "404"
    },
    {
      "path": "profile",
      "redirect": "profile/keys"
    },
    {
      "path": "profile",
      "component": "./routes/Profile",
      "routes": [
        {
          "path": "keys",
          "component": "./routes/Profile/Keys",
          "breadcrumbName": "keys"
        },
        {
          "path": "password/edit",
          "component": "./routes/Profile/Password",
          "breadcrumbName": "password"
        }
      ],
      "breadcrumbName": "profile",
      "navPathEnd": "profile"
    },
    {
      "path": "admin",
      "component": "./routes/Tenant",
      "indexRoute": {
        "breadcrumbName": "TenantMemebrs",
        "component": "./routes/Tenant/Members"
      },
      "routes": [
        {
          "path": "members",
          "component": "./routes/Tenant/Members",
          "breadcrumbName": "members"
        },
        {
          "path": "installations",
          "component": "./routes/Tenant/Services",
          "breadcrumbName": "installations"
        },
        {
          "path": "labels",
          "component": "./routes/Tenant/Labels",
          "breadcrumbName": "labels"
        }
      ],
      "breadcrumbName": "admin"
    },
    {
      "path": ":group",
      "redirect": "groups/:group"
    },
    {
      "path": "groups/:group",
      "component": "./routes/Group",
      "indexRoute": {
        "component": "./routes/Namespace/Overview"
      },
      "routes": [
        {
          "path": "pull_requests",
          "component": "./routes/Group/PullRequests",
          "breadcrumbName": "pullRequests"
        },
        {
          "path": "group_members",
          "component": "./routes/Group/Members",
          "breadcrumbName": "members"
        },
        {
          "path": "",
          "component": "./routes/Group/Settings",
          "routes": [
            {
              "path": "installations",
              "component": "./routes/Group/Settings/Services",
              "breadcrumbName": "installations"
            },
            {
              "path": "labels",
              "component": "./routes/Group/Settings/Labels",
              "breadcrumbName": "labels"
            }
          ],
          "breadcrumbName": "settings"
        }
      ],
      "breadcrumbName": "group",
      "navPathEnd": "dashboard/projects"
    },
    {
      "path": "u/:username",
      "component": "./routes/Namespace",
      "indexRoute": {
        "component": "./routes/Namespace/Events"
      },
      "routes": [
        {
          "path": "personal_projects",
          "component": "./routes/Namespace/Overview",
          "breadcrumbName": "personalProjects"
        },
        {
          "path": "operate_logs",
          "component": "./routes/Namespace/OperateLog",
          "breadcrumbName": "personalProjects"
        }
      ],
      "breadcrumbName": "user",
      "navPathEnd": "dashboard/projects"
    },
    {
      "path": ":namespace/:project.git",
      "redirect": ":namespace/:project"
    },
    {
      "path": ":namespace/:project",
      "component": "./routes/Project",
      "indexRoute": {
        "component": "./routes/Project/Files"
      },
      "routes": [
        {
          "path": "search",
          "component": "./routes/Project/Search",
          "breadcrumbName": "search"
        },
        {
          "path": "activity",
          "component": "./routes/Project/Events",
          "breadcrumbName": "activity"
        },
        {
          "path": "tree/:refName(/**)",
          "component": "./routes/Project/Files",
          "breadcrumbName": "files"
        },
        {
          "path": "blob/:refName(/**)",
          "component": "./routes/Project/Files",
          "breadcrumbName": "files"
        },
        {
          "path": "branches",
          "component": "./routes/Project/Branches",
          "breadcrumbName": "branches"
        },
        {
          "path": "compare",
          "indexRoute": {
            "component": "./routes/Project/Compare"
          },
          "routes": [
            {
              "path": ":from...:to",
              "component": "./routes/Project/Compare"
            }
          ],
          "breadcrumbName": "compare"
        },
        {
          "path": "pull_requests",
          "indexRoute": {
            "component": "./routes/Project/PullRequests"
          },
          "routes": [
            {
              "path": "new",
              "component": "./routes/Project/PullRequests/New"
            },
            {
              "path": ":iid",
              "component": "./routes/Project/PullRequests/Detail",
              "routes": [
                {
                  "path": "commits"
                },
                {
                  "path": "changes"
                }
              ]
            }
          ],
          "breadcrumbName": "pull_requests",
          "navPathEnd": "pull_requests"
        },
        {
          "path": "commits/:refName(/**)",
          "component": "./routes/Project/Commits",
          "breadcrumbName": "commits"
        },
        {
          "path": "tags",
          "component": "./routes/Project/Tags",
          "breadcrumbName": "tags"
        },
        {
          "path": "project_members",
          "component": "./routes/Project/Members",
          "breadcrumbName": "members"
        },
        {
          "path": "",
          "component": "./routes/Project/Settings",
          "routes": [
            {
              "path": "edit",
              "component": "./routes/Project/Settings/Options",
              "breadcrumbName": "edit"
            },
            {
              "path": "hooks",
              "component": "./routes/Project/Settings/Hooks",
              "breadcrumbName": "hooks"
            },
            {
              "path": "installations",
              "component": "./routes/Project/Settings/Services",
              "breadcrumbName": "installations"
            },
            {
              "path": "labels",
              "component": "./routes/Project/Settings/Labels",
              "breadcrumbName": "labels"
            },
            {
              "path": "reviews_settings",
              "component": "./routes/Project/Settings/Reviews",
              "breadcrumbName": "reviewsSettings"
            },
            {
              "path": "pull_requests_settings",
              "component": "./routes/Project/Settings/PullRequests",
              "breadcrumbName": "pullRequestsSettings"
            }
          ],
          "breadcrumbName": "settings"
        },
        {
          "path": "commit/:revision(/**)",
          "component": "./routes/Project/Commit",
          "breadcrumbName": "commits"
        },
        {
          "path": "applications",
          "component": "./routes/Project/Applications",
          "breadcrumbName": "applications"
        },
        {
          "path": "pipelines",
          "component": "./routes/Project/Pipelines",
          "breadcrumbName": "pipelines"
        },
        {
          "path": "pipelines/:id",
          "component": "./routes/Project/PipelineDetail",
          "breadcrumbName": "pipelinesDetail"
        },
        {
          "path": "artifacts",
          "component": "./routes/Project/Artifacts",
          "breadcrumbName": "artifacts"
        },
        {
          "path": "artifacts/recycle_bin",
          "component": "./routes/Project/ArtifactRecycleBin",
          "breadcrumbName": "artifactRecycleBin"
        },
        {
          "path": "artifacts/:name",
          "component": "./routes/Project/Artifact",
          "breadcrumbName": "artifact"
        }
      ],
      "breadcrumbName": "project",
      "navPathEnd": "dashboard/projects",
      "layoutWithoutNavigator": true
    },
    {
      "path": "*",
      "component": "./routes/NotFound"
    }
  ]
}