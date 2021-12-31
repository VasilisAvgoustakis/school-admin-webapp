import { lazy } from 'react';

const routes = [
  {
    path: 'login',
    component: lazy(() => import('components/login')),
    exact: true
  },

  {
    path: 'personen',
    component: lazy(() => import('components/personSelectList')),
    exact: true
  },
  
];

export default routes;