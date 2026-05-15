import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from './Cart';
import MobileDrawer from './MobileDrawer';

const Layout = ({ 
  children, 
  user, 
  cartItems, 
  wishlist, 
  onLogout, 
  isCartOpen, 
  setIsCartOpen, 
  isMobDrawerOpen, 
  setIsMobDrawerOpen,
  onRemoveFromCart,
  onCheckout,
  onShowInfo,
  openProfileModal,
  openNotifs
}) => {
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="app-layout">
      <Navbar 
        user={user} 
        cartCount={cartCount} 
        wishlistCount={wishlist.length} 
        onLogout={onLogout}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => {/* navigate to wishlist or handle */}}
        openProfileModal={openProfileModal}
        openMobDrawer={() => setIsMobDrawerOpen(true)}
        openNotifs={openNotifs}
      />
      
      <main className="main-content">
        {children}
      </main>

      <Footer 
        onShowInfo={onShowInfo} 
        openWishlist={() => {/* navigate to wishlist */}}
      />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveFromCart={onRemoveFromCart}
        onCheckout={onCheckout}
      />

      <MobileDrawer 
        isOpen={isMobDrawerOpen} 
        onClose={() => setIsMobDrawerOpen(false)}
        user={user}
        onLogout={onLogout}
        openProfileModal={openProfileModal}
      />
    </div>
  );
};

export default Layout;
