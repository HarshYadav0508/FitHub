// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home.jsx';
import Instructor from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';
import Login from '../pages/user/Login.jsx';
import Register from '../pages/user/Register.jsx';
import ClassPage from '../pages/Classes/ClassPage.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import StudentCP from '../pages/Dashboard/Student/StudentCP.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/instructors",
          element: <Instructor />
        },
        {
          path: "/classes",
          element: <Classes />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: `/class/:id`,
          element: <ClassPage />,
          loader: ({params}) => fetch(`http://localhost:3000/class/${params.id}`)
        }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
    },

    //USER Routes
    {
      path: "student-cp",
      element: <StudentCP />
    }
    ]
  }
]);
