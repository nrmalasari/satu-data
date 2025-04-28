import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const Layout = ({ children }) => {
    return (
      <div className="min-h-screen bg-[#f3f8ff] font-poppins flex flex-col">
        <Navbar />
        <main className="flex-1 mx-auto bg-[#f3f8ff] w-full">
          {children}
        </main>
        <Footer />
      </div>
    );
  };

export default Layout;