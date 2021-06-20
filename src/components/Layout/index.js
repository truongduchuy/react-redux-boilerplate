import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <div className="layout container card my-3">
      <div className="card-body">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
