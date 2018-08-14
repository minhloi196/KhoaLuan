import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

// function Loading() {
//   return <div>Loading...</div>;
// }

function Loading(props) {
  if (props.error) {
    console.log('eroroooor', props.error)
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



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/sql-editors', name: 'SqlEditors', component: SqlEditors },
  { path: '/charts', name: 'Charts', component: Charts },
];

export default routes;
