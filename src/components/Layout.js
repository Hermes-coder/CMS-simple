import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children, pages, onDeletePage }) => {
  return (
    <div className="layout">
      <Sidebar pages={pages} onDeletePage={onDeletePage} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
