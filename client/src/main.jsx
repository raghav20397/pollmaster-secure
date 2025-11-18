import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import Layout from './Layout.jsx'
import App from './App.jsx'; 
import Login from './pages/Login.jsx'; 
import Register from './pages/Register.jsx'; 
import './index.css';
import CreatePoll from './pages/CreatePoll.jsx';
//definiing routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      { path: '/', element: <App /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/create', element: <CreatePoll /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);