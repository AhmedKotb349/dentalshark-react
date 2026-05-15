import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SLIDES, CATS, PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';

const Home = ({ onAddToCart, onQuickView, onToggleWishlist, wishlist }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home-screen" className="screen active">
      {/* HERO SLIDESHOW */}
      <div className="hero-wrap">
        <div id="hero-ss" className="hero-ss">
          {SLIDES.map((slide, index) => (
            <div key={slide.id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={slide.img} alt={slide.nm} onError={(e) => e.target.parentElement.style.background = '#0f2040'} />
              <div className="slide-overlay"></div>
              <div className="slide-info">
                <div className="si-cat">{slide.cat}</div>
                <div className="si-name">{slide.nm}</div>
                <div className="si-brand">{slide.br}</div>
                <div className="si-price">{slide.pr}</div>
              </div>
            </div>
          ))}
          <button className="slide-arrow prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}>❮</button>
          <button className="slide-arrow next" onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}>❯</button>
          <div id="sdots" className="sdots">
            {SLIDES.map((_, index) => (
              <div 
                key={index} 
                className={`sdot ${index === currentSlide ? 'active' : ''}`} 
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="hero-features">
          <div className="hf-item">
            <div className="hf-icon">🚚</div>
            <div>
              <div className="hf-title">Free Shipping</div>
              <div className="hf-desc">On orders over 500 EGP</div>
            </div>
          </div>
          <div className="hf-item">
            <div className="hf-icon">🛡️</div>
            <div>
              <div className="hf-title">Genuine Warranty</div>
              <div className="hf-desc">100% Authentic Products</div>
            </div>
          </div>
          <div className="hf-item">
            <div className="hf-icon">💳</div>
            <div>
              <div className="hf-title">Secure Payment</div>
              <div className="hf-desc">COD & Online Payments</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* CATEGORIES */}
        <section className="sec">
          <div className="sec-head">
            <div>
              <h2 className="sec-title">Shop by Category</h2>
              <p className="sec-sub">Browse our extensive range of dental supplies</p>
            </div>
          </div>
          <div id="cat-grid" className="cat-grid">
            {CATS.map((cat) => (
              <Link to={`/shop?category=${cat.n}`} key={cat.n} className="cat-card">
                <div className="cat-icon">{cat.i}</div>
                <div className="cat-name">{cat.n}</div>
                <div className="cat-count">{cat.c}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* FLASH DEALS */}
        <section className="sec flash-sec">
          <div className="sec-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h2 className="sec-title">⚡ Flash Deals</h2>
              <div className="flash-timer">
                Ends in: <span id="fh">02</span>:<span id="fm">45</span>:<span id="fs">30</span>
              </div>
            </div>
            <Link to="/shop?flash=true" className="view-all">View All →</Link>
          </div>
          <div id="flash-grid" className="p-grid">
            {PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some(w => w.id === p.id)}
              />
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section className="sec">
          <div className="sec-head">
            <div>
              <h2 className="sec-title">Recommended for You</h2>
              <p className="sec-sub">Based on your clinical specialty</p>
            </div>
            <Link to="/shop" className="view-all">View All →</Link>
          </div>
          <div id="featured-grid" className="p-grid">
            {PRODUCTS.slice(4, 8).map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some(w => w.id === p.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
