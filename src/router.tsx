import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Auth

const SignIn = Loader(lazy(() => import('src/content/pages/Auth/SignIn')))

// Groups

const Groups = Loader(lazy(() => import('src/content/pages/Groups/Groups')))

const AddGroup = Loader(lazy(() => import('src/content/pages/Groups/Add')))

const EditGroup = Loader(lazy(() => import('src/content/pages/Groups/Edit')))

// Employees

const Employees = Loader(lazy(() => import('src/content/pages/Employees/Employees')))

const AddEmployee = Loader(lazy(() => import('src/content/pages/Employees/Add')))

const EditEmployee = Loader(lazy(() => import('src/content/pages/Employees/Edit')))

// Tasks

const Tasks = Loader(lazy(() => import('src/content/pages/Tasks/Tasks')))

const AddTask = Loader(lazy(() => import('src/content/pages/Tasks/Add')))

const EditTask = Loader(lazy(() => import('src/content/pages/Tasks/Edit')))

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/tasks" replace />
      },
      {
        path: 'overview',
        element: <Navigate to="/tasks" replace />
      },
      {
        path: '*',
        element: <Status404 />
      },

      // Auth
      {
        path: 'signin',
        element: <SignIn />
      },
      // {
      //   path: '',
      //   element: <SidebarLayout />,
      //   children: [
      //     {
      //       path: 'groups-add',
      //       element: <AddGroup />
      //     }
      //   ]
      // },
      // {
      //   path: 'groups-add',
      //   element: <AddGroup />
      // },
    ]
  },
  // Groups
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'groups',
        element: <Groups />
      },
      {
        path: 'add-group',
        element: <AddGroup />
      },
      {
        path: 'groups/edit/:id',
        element: <EditGroup />
      }
    ]
  },
  // Employees
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'employees',
        element: <Employees />
      },
      {
        path: 'add-employee',
        element: <AddEmployee />
      },
      {
        path: 'employees/edit/:id',
        element: <EditEmployee />
      },
    ]
  },
  // Tasks
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'add-task',
        element: <AddTask />
      },
      {
        path: 'tasks/edit/:id',
        element: <EditTask />
      },
    ]
  },
];

export default routes;
