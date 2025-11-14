import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Step 1: IMPORT THE PROVIDER
import { BlockchainProvider } from './context/BlockchainContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Step 2: WRAP THE <App /> COMPONENT */}
    <BlockchainProvider>
      <App />
    </BlockchainProvider>
  </React.StrictMode>
);