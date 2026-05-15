import React from 'react';
import LegacySite from './LegacySite';
import './index.css';

/**
 * App Component - Reverting to Legacy Monolithic UI inside React
 * This version renders the exact legacy HTML string using dangerouslySetInnerHTML
 * to ensure 100% visual parity while remaining in the React environment.
 */
const App = () => {
  return <LegacySite />;
};

export default App;