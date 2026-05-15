import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS, CATS, BRANDS } from '../data';
import ProductCard from '../components/ProductCard';

const Shop = ({ onAddToCart, onQuickView, onToggleWishlist, wishlist }) => {
  const query = new URLSearchParams(useLocation().search);
  const initialCategory = query.get('category') || '';
  const initialSearch = query.get('search') || '';
  const initialFlash = query.get('flash') === 'true';

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSort] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (category) {
      result = result.filter(p => p.cat2 === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.cat2.toLowerCase().includes(q)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (initialFlash) {
      result = result.filter(p => p.badge === 'flash');
    }

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [category, search, selectedBrands, sortBy, initialFlash]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  return (
    <div id="shop-screen" className="screen active">
      <div className="shop-wrap container">
        <aside className="shop-sidebar">
          <div className="shop-side-sec">
            <h3 className="shop-side-title">Categories</h3>
            <div id="shop-cats" className="shop-cats">
              <div 
                className={`scat-item ${category === '' ? 'active' : ''}`} 
                onClick={() => { setCategory(''); setCurrentPage(1); }}
              >
                <span>All Products</span>
                <span className="scat-cnt">{PRODUCTS.length}</span>
              </div>
              {CATS.map(c => (
                <div 
                  key={c.n} 
                  className={`scat-item ${category === c.n ? 'active' : ''}`}
                  onClick={() => { setCategory(c.n); setCurrentPage(1); }}
                >
                  <span>{c.i} {c.n}</span>
                  <span className="scat-cnt">{c.c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shop-side-sec">
            <h3 className="shop-side-title">Brands</h3>
            <div id="shop-brands" className="shop-brands">
              {BRANDS.map(b => (
                <label key={b} className="sbrand-item">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                  /> {b}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="shop-main">
          <div className="shop-top-bar">
            <div id="shop-count" className="shop-count">{filteredProducts.length} products found</div>
            <div className="shop-filters">
              <input 
                id="shop-search" 
                className="shop-search" 
                placeholder="Search in results..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
              <select 
                id="shop-sort" 
                className="shop-sort"
                value={sortBy}
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          <div id="shop-grid" className="p-grid">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAddToCart={onAddToCart} 
                  onQuickView={onQuickView} 
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.some(w => w.id === p.id)}
                />
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--text2)' }}>
                No products found.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div id="shop-pagination" className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button 
                  key={p}
                  onClick={() => { setCurrentPage(p); window.scrollTo(0, 0); }}
                  style={{ 
                    padding: '8px 14px', 
                    background: p === currentPage ? 'var(--teal)' : 'var(--card)', 
                    color: p === currentPage ? '#000' : 'var(--text)', 
                    border: '1px solid var(--b2)', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 700 
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
