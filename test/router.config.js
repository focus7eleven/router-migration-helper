import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import 'moment/locale/zh-cn';
import moment from 'moment';
import antdEn from 'antd/lib/locale-provider/en_US';
import antdZh from 'antd/lib/locale-provider/zh_CN';
import appLocaleDataEn from 'react-intl/locale-data/en';
import appLocaleDataZh from 'react-intl/locale-data/zh';
import Layout from './routes/Layout';
import Tenant from './routes/Tenant';
import Projects from './routes/Dashboard/Projects';
import Groups from './routes/Dashboard/Groups';
import Namespace from './routes/Namespace';
import Group from './routes/Group';
import Project from './routes/Project';
import TenantMemebrs from './routes/Tenant/Members';
import TenantServices from './routes/Tenant/Services';
import TenantLabels from './routes/Tenant/Labels';
// import ProjectIndex from './routes/Project/Index';
import NewProject from './routes/Project/New';
import NewGroup from './routes/Group/New';
import NamespaceOverview from './routes/Namespace/Overview';
import NamespaceEvents from './routes/Namespace/Events';
import NamespaceOperateLogs from './routes/Namespace/OperateLog';
import GroupMembers from './routes/Group/Members';
import GroupPullRequests from './routes/Group/PullRequests';
import GroupSettings from './routes/Group/Settings';
import GroupServices from './routes/Group/Settings/Services';
import GroupLabels from './routes/Group/Settings/Labels';
import ProjectSearch from './routes/Project/Search';
import ProjectEvents from './routes/Project/Events';
import ProjectFiles from './routes/Project/Files';
import ProjectBranches from './routes/Project/Branches';
import ProjectCompare from './routes/Project/Compare';
import ProjectPullRequests from './routes/Project/PullRequests';
import ProjectPullRequest from './routes/Project/PullRequests/Detail';
import ProjectNewPullRequest from './routes/Project/PullRequests/New';
import ProjectCommits from './routes/Project/Commits';
import ProjectTags from './routes/Project/Tags';
import ProjectMembers from './routes/Project/Members';
import ProjectSettings from './routes/Project/Settings';
import ProjectHooks from './routes/Project/Settings/Hooks';
import ProjectServices from './routes/Project/Settings/Services';
import ProjectLabels from './routes/Project/Settings/Labels';
import ProjectPullRequestsSettings from './routes/Project/Settings/PullRequests';
import ProjectReviewsSettings from './routes/Project/Settings/Reviews';
import ProjectOptions from './routes/Project/Settings/Options';
import ProjectApplications from './routes/Project/Applications';
import ProjectCommit from './routes/Project/Commit';
import ProjectPipelines from './routes/Project/Pipelines';
import ProjectPipelineDetail from './routes/Project/PipelineDetail';
import ProjectArtifacts from './routes/Project/Artifacts';
import ProjectArtifact from './routes/Project/Artifact';
import ProjectArtifactRecycleBin from './routes/Project/ArtifactRecycleBin';
import NotFound from './routes/NotFound';
import Codesearch from './routes/Codesearch';
import Search from './routes/Search';
import Activities from './routes/Dashboard/Activities';
import UserPullRequests from './routes/Dashboard/PullRequests';
// import DeployKey from './components/Project/Settings/Deploykey';
import Profile from './routes/Profile';
import ProfileKeys from './routes/Profile/Keys';
import ProfilePassword from './routes/Profile/Password';

import zhMessages from './locales/zh-CN.json';
import enMessages from './locales/en-US.json';

/* eslint-disable */
if (document.cookie.indexOf('LOCALE=en_US') >= 0) {
  moment.locale('en');
  window.appLocale = {
    messages: {
      ...enMessages,
    },
    antd: antdEn,
    locale: 'en-US',
    data: appLocaleDataEn,
  };
} else {
  moment.locale('zh-cn');
  window.appLocale = {
    messages: {
      ...zhMessages,
    },
    antd: antdZh,
    locale: 'zh-Hans-CN',
    data: appLocaleDataZh,
  };
}
/* esint-enable */
addLocaleData(window.appLocale.data);

export default function({ history }) {
  // 业务router
  const router = (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute /* index */ component={Projects} navPathEnd="dashboard/projects" />
        <Route
          path="dashboard"
          /* dashboard */ breadcrumbName="dashboard"
          navPathEnd="dashboard/projects"
        >
          <IndexRoute /* projects */ component={Projects} />
          <Route path="projects" /* projects */ breadcrumbName="projects" component={Projects}>
            <IndexRoute /* projects */ breadcrumbName="your" />
            <Route path="starred" /* groups */ breadcrumbName="starred" />
            <Route path="all" /* groups */ breadcrumbName="all" />
          </Route>
          <Route path="activity" breadcrumbName="Activity" component={Activities}>
            <IndexRoute /* projects */ breadcrumbName="your" />
            <Route path="starred" /* groups */ breadcrumbName="starred" />
            <Route path="all" /* groups */ breadcrumbName="all" />
          </Route>
          <Route
            path="pull_requests"
            /* dashboard */ breadcrumbName="PullRequests"
            component={UserPullRequests}
          />
          <Route path="groups" /* groups */ breadcrumbName="groups" component={Groups} />
        </Route>
        <Route
          path="search"
          /* search */ breadcrumbName="search"
          component={Search}
          navPathEnd="search"
        />
        <Route
          path="codesearch"
          /* codesearch */ breadcrumbName="codesearch"
          component={Codesearch}
          navPathEnd="codesearch"
        />
        <Route
          path="groups/new"
          /* new group */ breadcrumbName="new"
          component={NewGroup}
          navPathEnd="dashboard/projects"
        />
        <Route
          path="projects/new"
          /* new project */ breadcrumbName="new"
          component={NewProject}
          navPathEnd="dashboard/projects"
        />
        <Route path="404" breadcrumbName="404" component={NotFound} />
        <Redirect from="profile" to="profile/keys" />
        <Route
          /* user */ path="profile"
          breadcrumbName="profile"
          component={Profile}
          navPathEnd="profile"
        >
          <Route path="keys" breadcrumbName="keys" component={ProfileKeys} />
          <Route path="password/edit" breadcrumbName="password" component={ProfilePassword} />
        </Route>
        <Route /* tenant */ path="admin" breadcrumbName="admin" component={Tenant}>
          <IndexRoute /* members */ breadcrumbName="TenantMemebrs" component={TenantMemebrs} />
          <Route path="members" breadcrumbName="members" component={TenantMemebrs} />
          <Route path="installations" breadcrumbName="installations" component={TenantServices} />
          <Route path="labels" breadcrumbName="labels" component={TenantLabels} />
        </Route>
        <Redirect from=":group" to="groups/:group" />
        <Route
          path="groups/:group"
          /* group */ breadcrumbName="group"
          component={Group}
          navPathEnd="dashboard/projects"
        >
          <IndexRoute component={NamespaceOverview} />
          <Route path="pull_requests" breadcrumbName="pullRequests" component={GroupPullRequests} />
          <Route path="group_members" breadcrumbName="members" component={GroupMembers} />
          <Route breadcrumbName="settings" component={GroupSettings}>
            <Route path="installations" breadcrumbName="installations" component={GroupServices} />
            <Route path="labels" breadcrumbName="labels" component={GroupLabels} />
          </Route>
        </Route>
        <Route
          path="u/:username"
          /* group */ breadcrumbName="user"
          component={Namespace}
          navPathEnd="dashboard/projects"
        >
          <IndexRoute component={NamespaceEvents} />
          <Route
            path="personal_projects"
            breadcrumbName="personalProjects"
            component={NamespaceOverview}
          />
          <Route
            path="operate_logs"
            breadcrumbName="personalProjects"
            component={NamespaceOperateLogs}
          />
        </Route>
        <Redirect from=":namespace/:project.git" to=":namespace/:project" />
        <Route /* project */
          path=":namespace/:project"
          breadcrumbName="project"
          component={Project}
          navPathEnd="dashboard/projects"
          layoutWithoutNavigator
        >
          <IndexRoute component={ProjectFiles} />
          <Route path="search" breadcrumbName="search" component={ProjectSearch} />
          <Route path="activity" breadcrumbName="activity" component={ProjectEvents} />
          <Route path="tree/:refName(/**)" breadcrumbName="files" component={ProjectFiles} />
          <Route path="blob/:refName(/**)" breadcrumbName="files" component={ProjectFiles} />
          <Route path="branches" breadcrumbName="branches" component={ProjectBranches} />
          <Route path="compare" breadcrumbName="compare">
            <IndexRoute component={ProjectCompare} />
            <Route path=":from...:to" component={ProjectCompare} />
          </Route>
          <Route path="pull_requests" breadcrumbName="pull_requests" navPathEnd="pull_requests">
            <IndexRoute component={ProjectPullRequests} />
            <Route path="new" component={ProjectNewPullRequest} />
            <Route path=":iid" component={ProjectPullRequest}>
              <Route path="commits" />
              <Route path="changes" />
            </Route>
          </Route>
          <Route path="commits/:refName(/**)" breadcrumbName="commits" component={ProjectCommits} />
          <Route path="tags" breadcrumbName="tags" component={ProjectTags} />
          <Route path="project_members" breadcrumbName="members" component={ProjectMembers} />
          <Route breadcrumbName="settings" component={ProjectSettings}>
            <Route path="edit" breadcrumbName="edit" component={ProjectOptions} />
            <Route path="hooks" breadcrumbName="hooks" component={ProjectHooks} />
            <Route
              path="installations"
              breadcrumbName="installations"
              component={ProjectServices}
            />
            <Route path="labels" breadcrumbName="labels" component={ProjectLabels} />
            <Route
              path="reviews_settings"
              breadcrumbName="reviewsSettings"
              component={ProjectReviewsSettings}
            />
            <Route
              path="pull_requests_settings"
              breadcrumbName="pullRequestsSettings"
              component={ProjectPullRequestsSettings}
            />
            {/*<Route path="deployKey" breadcrumbName="deployKey" component={DeployKey} />*/}
            {/*<Route path="advance" breadcrumbName="advance" component={Advance} />*/}
          </Route>
          <Route path="commit/:revision(/**)" breadcrumbName="commits" component={ProjectCommit} />
          <Route
            path="applications"
            breadcrumbName="applications"
            component={ProjectApplications}
          />
          <Route path="pipelines" breadcrumbName="pipelines" component={ProjectPipelines} />
          <Route
            path="pipelines/:id"
            breadcrumbName="pipelinesDetail"
            component={ProjectPipelineDetail}
          />
          <Route path="artifacts" breadcrumbName="artifacts" component={ProjectArtifacts} />
          <Route path="artifacts/recycle_bin" breadcrumbName="artifactRecycleBin" component={ProjectArtifactRecycleBin} />
          <Route path="artifacts/:name" breadcrumbName="artifact" component={ProjectArtifact} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
  return (
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        {router}
      </IntlProvider>
    </LocaleProvider>
  );
}