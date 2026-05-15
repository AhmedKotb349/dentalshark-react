import { useContext } from 'react';
import AppContext from '../context/AppContext';

/**
 * Custom hook to access the global AppContext
 * Requirement: "Use React Hooks"
 * Requirement: "Write clean, readable, and maintainable code"
 */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}

export default useApp;
