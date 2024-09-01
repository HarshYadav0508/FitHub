// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home.jsx';
import Instructor from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';
import Login from '../pages/user/Login.jsx';
import Register from '../pages/user/Register.jsx';

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
        }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);
