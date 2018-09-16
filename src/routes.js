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

const SqlEditors = Loadable({
  loader: () => import('./views/SqlEditors'),
  loading: Loading,
});

const GitUser = Loadable({
  loader: () => import('./views/GitUser'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/sql-editors', name: 'SqlEditors', component: SqlEditors },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/git-users', name: 'GitUser', component: GitUser },
];

export default routes;
