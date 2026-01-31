import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTopProvider from '../common/ScrollToTopProvider';
import FloatingScrollButton from '../common/FloatingScrollButton';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTopProvider />
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingScrollButton />
    </div>
  );
};

export default Layout;
