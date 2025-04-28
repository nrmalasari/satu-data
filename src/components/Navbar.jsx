import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdownHover = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-50 to-purple-50 z-[1000] transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      style={{
        height: '100px',
        boxShadow: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Gradient separator abu-abu */}
      <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-gray-200/40 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between py-0">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="text-x1 font-bold uppercase leading-tight text-black">
              SATU<br />DATA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <nav>
              <ul className="flex space-x-8">
                {/* Metadata Dropdown - Hover Activated */}
                <li 
                  className="relative"
                  onMouseEnter={() => handleDropdownHover('metadata')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link to="/metadata" className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200 flex items-center cursor-pointer">
                    Metadata
                    <i className={`ri-arrow-down-s-line ml-1 transition-transform duration-200 ${activeDropdown === 'metadata' ? 'rotate-180' : ''}`}></i>
                  </Link>
                  <div 
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-[20px] shadow-lg py-2 z-20 transition-all duration-300 origin-top ${activeDropdown === 'metadata' ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'}`}
                  >
                    {[2021, 2022, 2023, 2024].map(year => (
                      <Link
                        key={year}
                        to={`/metadata?year=${year}`}
                        className="block px-4 py-2 text-[#3a9ec9] hover:bg-blue-50 hover:text-[#2a8bb7] transition-colors duration-150"
                      >
                        METADATA {year}
                      </Link>
                    ))}
                  </div>
                </li>

                {/* Dokumen Statistik Dropdown - Hover Activated */}
                <li 
                  className="relative"
                  onMouseEnter={() => handleDropdownHover('dokumen')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200 flex items-center cursor-pointer">
                    Dokumen Statistik
                    <i className={`ri-arrow-down-s-line ml-1 transition-transform duration-200 ${activeDropdown === 'dokumen' ? 'rotate-180' : ''}`}></i>
                  </div>
                  <div 
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-[20px] shadow-lg py-2 z-20 transition-all duration-300 origin-top ${activeDropdown === 'dokumen' ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'}`}
                  >
                    {[
                      'Buku Statistik Pertanian',
                      'Buku Metadata', 
                      'Buku Data Pokok',
                      'Statistik Sektoral',
                      'Produk Domestik Regional',
                      'Buku Pedoman'
                    ].map(item => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-[#3a9ec9] hover:bg-blue-50 hover:text-[#2a8bb7] transition-colors duration-150"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </li>

                {/* Regular Menu Items */}
                <li>
                  <Link 
                    to="/organisasi" 
                    className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200"
                  >
                    Organisasi
                  </Link>
                </li>
                <li>
                  <a href="#" className="font-bold text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-200">
                    Infografis
                  </a>
                </li>
              </ul>
            </nav>
            
            <div className="ml-8">
              <a
                href="#"
                className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] px-6 py-2.5 rounded-full text-white font-bold transition-all duration-300 shadow-lg hover:shadow-blue-300/50"
              >
                Tentang
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <a
              href="#"
              className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] px-5 py-2 rounded-full text-white font-bold transition-colors shadow-md mr-4"
            >
              Tentang
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
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-gradient-to-b from-blue-50 to-cyan-50 z-50 transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          boxShadow: '-8px 0 24px rgba(58, 158, 201, 0.15)'
        }}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <Link to="/" className="text-xl font-bold uppercase text-black">
              SATU<br />DATA
            </Link>
            <button 
              onClick={toggleMenu} 
              className="text-3xl focus:outline-none text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors"
            >
              ×
            </button>
          </div>
          
          <ul className="space-y-6">
            {/* Mobile Metadata Dropdown */}
            <li>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'metadata' ? null : 'metadata')}
                className="w-full flex justify-between items-center py-3 text-lg font-medium text-[#3a9ec9] border-b border-blue-100 hover:text-[#2a8bb7] transition-colors duration-200"
              >
                Metadata
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${activeDropdown === 'metadata' ? 'rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'metadata' ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="ml-4 mt-2 space-y-2">
                  {[2021, 2022, 2023, 2024].map(year => (
                    <Link
                      key={year}
                      to={`/metadata?year=${year}`}
                      className="block py-2 pl-4 text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-150"
                      onClick={toggleMenu}
                    >
                      METADATA {year}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Mobile Dokumen Statistik Dropdown */}
            <li>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'dokumen' ? null : 'dokumen')}
                className="w-full flex justify-between items-center py-3 text-lg font-medium text-[#3a9ec9] border-b border-blue-100 hover:text-[#2a8bb7] transition-colors duration-200"
              >
                Dokumen Statistik
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${activeDropdown === 'dokumen' ? 'rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'dokumen' ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    'Buku Statistik Pertanian',
                    'Buku Metadata', 
                    'Buku Data Pokok',
                    'Statistik Sektoral',
                    'Produk Domestik Regional',
                    'Buku Pedoman'
                  ].map(item => (
                    <a
                      key={item}
                      href="#"
                      className="block py-2 pl-4 text-[#3a9ec9] hover:text-[#2a8bb7] transition-colors duration-150"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </li>

            {/* Regular Mobile Menu Items */}
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
              <a href="#" className="block py-3 text-lg font-medium text-[#3a9ec9] border-b border-[#3a9ec9]/20 hover:text-[#2a8bb7] transition-colors duration-200">
                Infografis
              </a>
            </li>
          </ul>
          
          <div className="mt-auto pt-8">
            <a 
              href="#"
              className="block text-center bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] px-6 py-3 rounded-full text-white font-bold transition-all duration-300 shadow-lg hover:shadow-blue-300/50"
            >
              Tentang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;