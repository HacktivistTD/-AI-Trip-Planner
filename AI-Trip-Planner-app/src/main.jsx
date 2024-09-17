import React from 'react'; // Ensure React is imported
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Assuming this is a .jsx or .tsx file
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import Header from './components/Custom/Header';
import { Toaster } from 'sonner';


// Create a router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {

    path: '/create-trip',
    element: <CreateTrip />,
  }
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
  </StrictMode>,
);
