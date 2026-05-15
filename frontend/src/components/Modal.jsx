import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show" id="profile-modal">
      <div className="modal-content">
        <div className="modal-head">
          <h3 className="modal-title" id="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" id="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
