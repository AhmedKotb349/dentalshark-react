import React from 'react';

const Toast = ({ message, type, show }) => {
  const icons = { success: "✅", warn: "⚠️", error: "❌", info: "💡" };

  return (
    <div id="toast" className={`toast ${show ? 'show' : ''}`}>
      <span id="toast-icon">{icons[type] || "💡"}</span>
      <span id="toast-msg">{message}</span>
    </div>
  );
};

export default Toast;
