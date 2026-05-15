import React from 'react';

const Cart = ({ isOpen, onClose, cartItems, onRemoveFromCart, onCheckout }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalPts = cartItems.reduce((acc, item) => acc + item.pts * item.qty, 0);
  const shipping = 150;

  return (
    <>
      <div id="cart-sidebar" className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <h3 className="cart-title">Your Cart</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div id="cart-items" className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text2)' }}>
              🛒<br /><br />Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  className="cart-item-img" 
                  src={item.img} 
                  alt={item.name} 
                  onError={(e) => e.target.parentElement.style.background = '#0f2040'} 
                />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-sub">{item.brand} × {item.qty}</div>
                  <div className="cart-pts">⚡ +{item.pts * item.qty} pts</div>
                  <button className="cart-item-del" onClick={() => onRemoveFromCart(item.id)}>🗑</button>
                </div>
                <div className="cart-item-price">{(item.price * item.qty).toLocaleString()} EGP</div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div id="cart-pts-text" className="cart-pts-badge">
              Earn {totalPts} SHARK Points on this order
            </div>
            <div className="cart-summary">
              <div className="cs-row"><span>Subtotal</span><span id="cart-sub">{subtotal.toLocaleString()} EGP</span></div>
              <div className="cs-row"><span>Shipping</span><span>{shipping.toLocaleString()} EGP</span></div>
              <div className="cs-row cs-total"><span>Total</span><span id="cart-tot">{(subtotal + shipping).toLocaleString()} EGP</span></div>
            </div>
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase' }}>Payment Method</label>
              <select id="pay-method" className="form-input" style={{ padding: '8px' }}>
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="Card">Credit / Debit Card</option>
                <option value="Wallet">E-Wallet (Vodafone Cash)</option>
              </select>
            </div>
            <button className="btn-checkout" onClick={onCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>
      {isOpen && <div className="mob-overlay open" onClick={onClose} style={{ zIndex: 1000 }}></div>}
    </>
  );
};

export default Cart;
