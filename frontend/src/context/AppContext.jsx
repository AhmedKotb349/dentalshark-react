import React, { createContext, useContext, useState, useEffect } from 'react';

// ================================================================
// Context API Configuration
// Requirement: "Use Context API for global state management"
// ================================================================

const AppContext = createContext(null);

/**
 * AppProvider Component
 * Manages global state including Authentication, Cart, Wishlist, and Theme.
 */
export function AppProvider({ children }) {
  // ─── Requirement: useState for state management ─────────────────
  
  // Auth state: Initialize from localStorage for "faster" reload
  // Requirement: "when i reload the page i must reload but still in sane screen"
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sharkPts, setSharkPts] = useState(() => currentUser?.sharkPts || 0);
  
  // Theme state: Persisted in localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  // ─── Requirement: useEffect for handling side effects ───────────

  // Sync theme with localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Auth verification: Silently verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Verify token with backend
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => {
        if (r.status === 401 || r.status === 403) {
          logout();
          throw new Error('Session expired');
        }
        if (!r.ok) return; // Ignore other server errors (stay logged in locally)
        return r.json();
      })
      .then(data => {
        if (data?.user) {
          setCurrentUser(data.user);
          setSharkPts(data.user.sharkPts || 0);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      })
      .catch((err) => {
        console.warn('Auth verification skipped or failed:', err.message);
      });
  }, []);


  // ─── Cart Management Section ───────────────────────────────────
  const addToCart = (product) =>
    setCart(prev => {
      const ex = prev.find(x => x.id === product.id);
      return ex
        ? prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x)
        : [...prev, { ...product, qty: 1 }];
    });

  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

  // ─── Wishlist Management Section ───────────────────────────────
  const toggleWishlist = (product) =>
    setWishlist(prev =>
      prev.find(x => x.id === product.id)
        ? prev.filter(x => x.id !== product.id)
        : [...prev, product]
    );
  const isWishlisted = (id) => wishlist.some(x => x.id === id);

  // ─── Authentication Helpers Section ────────────────────────────
  const login = (user, token) => {
    setCurrentUser(user);
    setSharkPts(user.sharkPts || 0);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    setWishlist([]);
    setSharkPts(0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // ─── Theme Toggle Section ─────────────────────────────────────
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Provide state to children
  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal,
      wishlist, toggleWishlist, isWishlisted,
      sharkPts, setSharkPts,
      theme, toggleTheme,
      login, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
