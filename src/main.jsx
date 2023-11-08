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
import BrowseByCategory from './components/BrowseByCategory/BrowseByCategory';
import MyPostedJobs from './components/MyPostedJobs/MyPostedJobs';
import UpdateJob from './components/MyPostedJobs/UpdateJob';
import MyBids from './components/Bids/MyBids';
import BidRequest from './components/BidRequest/BidRequest';
import JobDetails from './components/Bids/JobDetails';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {

    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/jobs')
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
        path: "jobs/:category",
        element: <BrowseByCategory></BrowseByCategory>
      },
      {
        path: "/addJob",
        element: <PrivateRoute><AddJob></AddJob></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)

      },
      {
        path: "/postedJobs",
        element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
      },
      {
        path: "/updateJob/:id",
        element: <UpdateJob></UpdateJob>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateJob/${params.id}`)
      },
      {
        path: "/myBids",
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: "/bidRequest",
        element: <PrivateRoute><BidRequest></BidRequest></PrivateRoute>
      },
      {
        path: "jobDetails/:id",
        element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateJob/${params.id}`)


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
