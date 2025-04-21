import React, { useState, useEffect } from 'react';

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
          height: '100px'
        }}
      >
      {/* Floating shadow */}
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-purple-100/70 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between py-0">
          {/* Logo */}
          <div className="logo">
            <h1 className="text-x1 font-bold uppercase leading-tight text-black">
              SATU<br />DATA
            </h1>
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
                  <div className="font-bold text-indigo-800 hover:text-purple-600 transition-colors duration-200 flex items-center cursor-pointer">
                    Metadata
                    <i className={`ri-arrow-down-s-line ml-1 transition-transform duration-200 ${activeDropdown === 'metadata' ? 'rotate-180' : ''}`}></i>
                  </div>
                  <div 
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-[20px] shadow-lg py-2 z-20 transition-all duration-300 origin-top ${activeDropdown === 'metadata' ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'}`}
                  >
                    {[2021, 2022, 2023, 2024].map(year => (
                      <a
                        key={year}
                        href="#"
                        className="block px-4 py-2 text-indigo-800 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150"
                      >
                        METADATA {year}
                      </a>
                    ))}
                  </div>
                </li>

                {/* Dokumen Statistik Dropdown - Hover Activated */}
                <li 
                  className="relative"
                  onMouseEnter={() => handleDropdownHover('dokumen')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="font-bold text-indigo-800 hover:text-purple-600 transition-colors duration-200 flex items-center cursor-pointer">
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
                        className="block px-4 py-2 text-indigo-800 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </li>

                {/* Regular Menu Items */}
                <li>
                  <a href="#" className="font-bold text-indigo-800 hover:text-purple-600 transition-colors duration-200">
                    Organisasi
                  </a>
                </li>
                <li>
                  <a href="#" className="font-bold text-indigo-800 hover:text-purple-600 transition-colors duration-200">
                    Infografis
                  </a>
                </li>
              </ul>
            </nav>
            
            <div className="ml-8">
              <a
                href="#"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2.5 rounded-full text-white font-bold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-300/50"
              >
                Login
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <a
              href="#"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2 rounded-full text-white font-bold hover:from-purple-600 hover:to-indigo-700 transition-colors shadow-md mr-4"
            >
              Login
            </a>
            <button 
              onClick={toggleMenu}
              className="text-2xl focus:outline-none text-indigo-800 hover:text-purple-600 transition-colors"
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-gradient-to-b from-indigo-50 to-purple-50 z-50 transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          boxShadow: '-8px 0 24px rgba(139, 92, 246, 0.15)'
        }}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-xl font-bold uppercase text-black">
              SATU<br />DATA
            </h1>
            <button 
              onClick={toggleMenu} 
              className="text-3xl focus:outline-none text-indigo-800 hover:text-purple-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          <ul className="space-y-6">
            {/* Mobile Metadata Dropdown */}
            <li>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'metadata' ? null : 'metadata')}
                className="w-full flex justify-between items-center py-3 text-lg font-medium text-indigo-800 border-b border-indigo-100 hover:text-purple-600 transition-colors duration-200"
              >
                Metadata
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${activeDropdown === 'metadata' ? 'rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'metadata' ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="ml-4 mt-2 space-y-2">
                  {[2021, 2022, 2023, 2024].map(year => (
                    <a
                      key={year}
                      href="#"
                      className="block py-2 pl-4 text-indigo-700 hover:text-purple-600 transition-colors duration-150"
                    >
                      METADATA {year}
                    </a>
                  ))}
                </div>
              </div>
            </li>

            {/* Mobile Dokumen Statistik Dropdown */}
            <li>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'dokumen' ? null : 'dokumen')}
                className="w-full flex justify-between items-center py-3 text-lg font-medium text-indigo-800 border-b border-indigo-100 hover:text-purple-600 transition-colors duration-200"
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
                      className="block py-2 pl-4 text-indigo-700 hover:text-purple-600 transition-colors duration-150"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </li>

            {/* Regular Mobile Menu Items */}
            <li>
              <a href="#" className="block py-3 text-lg font-medium text-indigo-800 border-b border-indigo-100 hover:text-purple-600 transition-colors duration-200">
                Organisasi
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 text-lg font-medium text-indigo-800 border-b border-indigo-100 hover:text-purple-600 transition-colors duration-200">
                Infografis
              </a>
            </li>
          </ul>
          
          <div className="mt-auto pt-8">
            <a 
              href="#"
              className="block text-center bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 rounded-full text-white font-bold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-300/50"
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