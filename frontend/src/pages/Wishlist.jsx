import React from 'react';
import ProductCard from '../components/ProductCard';

const Wishlist = ({ wishlist, onAddToCart, onQuickView, onToggleWishlist, onClearWishlist }) => {
  return (
    <div id="wishlist-screen" className="screen active">
      <div className="container sec">
        <div className="sec-head">
          <div>
            <h2 className="sec-title">My Wishlist ❤️</h2>
            <p className="sec-sub">Products you've saved for later</p>
          </div>
          {wishlist.length > 0 && (
            <button className="btn-outline" onClick={onClearWishlist}>Clear All</button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div id="wl-empty" className="empty-state" style={{ display: 'block' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>❤️</div>
            <h3>Your wishlist is empty</h3>
            <p>Save items you like to track price drops and availability.</p>
            <a href="/shop" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Explore Shop</a>
          </div>
        ) : (
          <div id="wl-grid" className="p-grid">
            {wishlist.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
