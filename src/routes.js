import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';
// import GitUser from './views/GitUser/GitUser';

// function Loading() {
//   return <div>Loading...</div>;
// }

function Loading(props) {
  if (props.error) {
    console.log('error', props.error)
    return <div>Error!</div>;
  } else {
    return <div>Loading...</div>;
  }
}

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Analyze = Loadable({
  loader: () => import('./views/Analyze'),
  loading: Loading,
});

const SqlEditors = Loadable({
  loader: () => import('./views/SqlEditors'),
  loading: Loading,
});

const GitUser = Loadable({
  loader: () => import('./views/GitUser'),
  loading: Loading,
});

const Comparision = Loadable({
  loader: () => import('./views/Comparision'),
  loading: Loading,
});

const CorporateHealth = Loadable({
  loader: () => import('./views/CorporateHealth'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/analyze', name: 'Dashboard', component: Analyze },
  { path: '/sql-editors', name: 'SqlEditors', component: SqlEditors },
  { path: '/report', name: 'Charts', component: Charts },
  { path: '/comparision', name: 'Comparision', component: Comparision},
  { path: '/git-users', name: 'GitUser', component: GitUser },
  { path: '/corporate-health', name: 'Corporate Health', component: CorporateHealth },
];

export default routes;
