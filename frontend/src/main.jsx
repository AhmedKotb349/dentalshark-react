import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// ─── Requirement: Install and use Bootstrap properly ──────────────
// Bootstrap is imported in index.css for global availability.
// This allows using Bootstrap classes like 'row', 'col', 'card', etc.

// ─── Requirement: Context API for global state management ─────────
// AppProvider wraps the entire application to provide global access
// to state like currentUser, cart, wishlist, and theme.
import { AppProvider } from './context/AppContext.jsx';

import App from './App.jsx';

/**
 * Entry Point of the Application
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*
      BrowserRouter — Requirement: "Implement routing for navigation"
      Enables client-side routing using React Router.
    */}
    <BrowserRouter>
      {/*
        AppProvider — Requirement: "Use Context API for global state management"
        Wraps the app to provide access to global hooks like useApp().
      */}
      <AppProvider>
        {/* Main Application Component */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

