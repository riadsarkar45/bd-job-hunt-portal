import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './dashboard/authProvider/AuthProvider.jsx'
import Route from './components/Routes/Route.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Route} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
