import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './dashboard/authProvider/AuthProvider.jsx'
import Route from './components/Routes/Route.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Route} />
    </AuthProvider>
  </React.StrictMode>,
)
