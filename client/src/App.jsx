import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './routes/Home/Main';
import Layout from './routes/layout/layout';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import Order from './routes/Order/Order';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Main />
        }, {
          path: "/login",
          element: <Login />
        }, {
          path: "/register",
          element: <Register />
        }, {
          path: "/order",
          element: <Order />
        }

      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App


