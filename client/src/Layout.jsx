import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function Layout() {
  return (
    <div>
      <div className="starry-background">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      <Header />
      
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;