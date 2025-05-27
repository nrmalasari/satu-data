import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-[1000] transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{
        height: '100px',
        boxShadow: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-gray-200/40 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between py-0">
          {/* Logo dan Teks */}
          <div className="logo flex items-center space-x-2">
            <img
              src="/images/logoSatuData.png"// Ganti dengan path logo Anda
              alt="Logo Satu Data"
              className="h-12 w-12 object-contain"
            />
            <Link to="/" className="text-xl font-bold uppercase leading-tight text-black">
              SATU<br />DATA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <nav>
              <ul className="flex space-x-8">
                {/* Metadata tanpa Dropdown */}
                <li>
                  <Link
                    to="/metadata"
                    className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200"
                  >
                    Metadata
                  </Link>
                </li>

                {/* Menu Lain */}
                <li>
                  <Link
                    to="/organisasi"
                    className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200"
                  >
                    Organisasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/infografis"
                    className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200"
                  >
                    Infografis
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="ml-8">
              <a
                href="#"
                className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] px-6 py-2.5 rounded-full text-white font-bold transition-all duration-300 shadow-lg hover:shadow-blue-300/50"
              >
                Login
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <a
              href="#"
              className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] px-5 py-2 rounded-full text-white font-bold transition-colors shadow-md mr-4"
            >
              Login
            </a>
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors"
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-gradient-to-b from-blue-50 to-cyan-50 z-50 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          boxShadow: '-8px 0 24px rgba(58, 158, 201, 0.15)',
        }}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-xl font-bold uppercase text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                SATU<br />DATA
              </Link>
            </div>
            <button
              onClick={toggleMenu}
              className="text-3xl focus:outline-none text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors"
            >
              ×
            </button>
          </div>

          <ul className="space-y-6">
            {/* Metadata tanpa Dropdown */}
            <li>
              <Link
                to="/metadata"
                className="block py-3 text-lg font-medium text-[#3a9ec9] border-b border-[#3a9ec9]/20 hover:text-[#2a8bb7] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Metadata
              </Link>
            </li>

            {/* Menu Lain */}
            <li>
              <Link
                to="/organisasi"
                className="block py-3 text-lg font-medium text-[#3a9ec9] border-b border-[#3a9ec9]/20 hover:text-[#2a8bb7] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Organisasi
              </Link>
            </li>
            <li>
              <Link
                to="/infografis"
                className="block py-3 text-lg font-medium text-[#3a9ec9] border-b border-[#3a9ec9]/20 hover:text-[#2a8bb7] transition-colors duration-200"
                onClick={toggleMenu}
              >
                Infografis
              </Link>
            </li>
          </ul>

          <div className="mt-auto pt-8">
            <a
              href="#"
              className="block text-center bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] px-6 py-3 rounded-full text-white font-bold transition-all duration-300 shadow-lg hover:shadow-blue-300/50"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;