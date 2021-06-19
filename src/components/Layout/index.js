import React from 'react';
import './index.scss';

function Layout({ children }) {
  return (
    <div className="layout container card my-3">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Layout;
