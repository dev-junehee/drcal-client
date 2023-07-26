import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './pages';
import { RouterProvider } from 'react-router-dom';
// import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
