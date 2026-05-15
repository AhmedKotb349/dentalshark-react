import React from 'react';

const ProductCard = ({ product, onAddToCart, onQuickView, onToggleWishlist, isWishlisted }) => {
  const bmap = { sale: "b-sale", hot: "b-hot", new: "b-new", flash: "b-flash" };
  const blabel = { sale: "SALE", hot: "🔥 HOT", new: "NEW", flash: "⚡ FLASH" };
  const disc = product.old ? Math.round((1 - product.price / product.old) * 100) : 0;
  const stars = Math.round(product.rating);

  return (
    <div className="pc" onClick={() => onQuickView(product.id)}>
      <div className="pc-img-wrap">
        <img 
          className="pc-img" 
          src={product.img} 
          alt={product.name} 
          loading="lazy" 
          onError={(e) => e.target.parentElement.style.background = '#0f2040'} 
        />
        <div className="pc-img-overlay"></div>
        {product.badge && (
          <div className={`pc-badge ${bmap[product.badge] || "b-new"}`}>
            {blabel[product.badge] || product.badge.toUpperCase()}
          </div>
        )}
        <button 
          className={`pc-wish ${isWishlisted ? "wl-active" : ""}`} 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="pc-body">
        <div className="pc-cat">🔬 {product.cat}</div>
        <div className="pc-name">{product.name}</div>
        <div className="pc-brand">{product.brand}</div>
        <div className="pc-desc">{product.desc}</div>
        <div className="pc-rating">
          <span className="pc-stars">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
          <span className="pc-rating-num">{product.rating}</span>
          <span className="pc-rating-cnt">({product.rev})</span>
        </div>
        <div className="pc-price-row">
          <span className="pc-price">{product.price.toLocaleString()} EGP</span>
          {product.old && (
            <>
              <span className="pc-old">{product.old.toLocaleString()} EGP</span>
              <span className="pc-disc">-{disc}%</span>
            </>
          )}
        </div>
        <div className="pc-pts">⚡ Earn {product.pts} SHARK Points</div>
        <div className="pc-ship">
          {product.price > 1000 ? (
            <span style={{ color: 'var(--gold)' }}>⚡ Express 1–2 days</span>
          ) : (
            <span style={{ color: 'var(--teal)' }}>🚚 Free shipping 3–5 days</span>
          )}
        </div>
        <div className="pc-actions">
          <button className="btn-cart" onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}>
            🛒 Add to Cart
          </button>
          <button className="btn-qv" onClick={(e) => { e.stopPropagation(); onQuickView(product.id); }} title="Quick View">
            👁
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
