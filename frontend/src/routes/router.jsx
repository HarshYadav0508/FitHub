// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home.jsx';
import Instructor from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';

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
        }
    ]
  }
]);
