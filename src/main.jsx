import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root.jsx";
import ErrorPage from './Error-Page.jsx';
import Home from './components/Home/Home';
import Shop from "./components/Shop/Shop";
import Profile from './components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home/>},
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "shop",
        element: <Shop/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
