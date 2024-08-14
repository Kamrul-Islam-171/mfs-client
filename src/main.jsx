import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayour from './MainLayout/MainLayour';
import Home from './Compontnts/Home/Home';
import About from './Compontnts/About/About';
import Login from './Compontnts/Login/Login';
import Register from './Compontnts/Register/Register';
import AuthProvider from './Provider/AuthProvider';
import Dashboard from './Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayour></MainLayour>,
    errorElement: <p>Eoor</p>,
    children: [
      {
        path: '/',
        element: <Login></Login>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/reg',
        element: <Register></Register>
      },
      {
        path: '/dashboard',
        element:<Dashboard></Dashboard>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
