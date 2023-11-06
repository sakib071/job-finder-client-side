import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Layout/Main'
import Login from './components/Login/Login';
import AuthProvider from './components/providers/AuthProviders';
import SignUp from './components/SignUp/SignUp';
import AddJob from './components/AddJob/AddJob';
import Home from './components/Home/Home';
import ErrorPage from './components/Shared/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {

    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <SignUp></SignUp>
      },
      {
        path: "/addJob",
        element: <AddJob></AddJob>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
