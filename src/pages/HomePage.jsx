import React, { useRef, useState, useEffect } from "react";
import Layout from "../components/Layout";
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { 
  getSectors, 
  getInfografis, 
  getStats,
  searchData
} from '../services/api';

const HomePage = () => {
  // State management
  const [data, setData] = useState({
    infografis: [],
    sectors: [],
    stats: {
      total_datasets: 0,
      total_organizations: 0,
      total_infografis: 0
    },
    loading: true,
    error: null
  });

  const [searchQuery, setSearchQuery] = useState('');
  const infografisRef = useRef(null);
  const [showAllSectors, setShowAllSectors] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infografis, sectors, stats] = await Promise.all([
          getInfografis(),
          getSectors(),
          getStats()
        ]);
        
        setData({
          infografis,
          sectors,
          stats,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };
    
    fetchData();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    // Redirect to metadata page with search query
    navigate(`/metadata?q=${encodeURIComponent(searchQuery)}`);
  };

  // Carousel controls
  const scrollLeft = () => {
    infografisRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    infografisRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Loading state
  if (data.loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (data.error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
            <p className="text-gray-700">{data.error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] bg-gradient-to-br from-[#e8f1ff] to-[#d6e6ff] pt-20 lg:pt-0 z-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full pt-12 lg:pt-0">
            {/* Left Column - Title and Search */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10 mt-10 lg:mt-0">
              <h1 className="text-4xl sm:text-4xl lg:text-[64px] font-extrabold leading-tight lg:leading-[80px] text-[#02033b] tracking-tight">
                Parepare<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] text-4xl sm:text-4xl lg:text-[64px]">
                  Dalam Genggaman
                </span>
              </h1>
              
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl lg:text-2xl text-[#02033b] max-w-lg opacity-90">
                Cari Data Tentang Kota Parepare <br />
                Cepat Akurat dan Bisa Diakses Dimana Saja
              </p>
              
              {/* Search Box */}
              <div className="mt-8 sm:mt-10 w-full max-w-md relative group">
                <div className="absolute inset-0 bg-white rounded-xl border border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="relative w-full h-14 sm:h-16 pl-6 pr-28 bg-transparent rounded-xl focus:outline-none text-base sm:text-lg z-10"
                  placeholder="Cari data..."
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 top-2 h-10 sm:h-12 w-24 sm:w-28 bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] rounded-lg flex items-center justify-center text-white font-semibold text-base transition-all duration-300 z-10 shadow-md hover:shadow-lg"
                >
                  Cari
                </button>
              </div>
              
              {/* Data Sektor Button */}
              <div className="mt-8 sm:mt-10">
                <button 
                  onClick={() => {
                    document.getElementById('sektor-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-48 h-12 bg-gradient-to-r from-[#f6c041] to-[#e18335] hover:from-[#e0a82a] hover:to-[#d1721a] rounded-xl text-white font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-base group"
                >
                  <span>Data Sektor</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right Column - Image/GIF */}
            <div className="hidden lg:block w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 lg:pl-12 justify-center items-center z-10">
              <div className="relative w-full max-w-2xl">
                <img 
                  src="/images/gambardata.gif" 
                  alt="Visualisasi Data Parepare"
                  className="w-full h-auto object-cover rounded-xl mix-blend-screen"
                  style={{ background: 'transparent' }}
                  onError={(e) => {
                    e.target.src = '/images/default-data.gif';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center relative -mt-16 mb-16 z-20">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-4 sm:p-5 max-w-4xl w-full grid grid-cols-3 gap-2 sm:gap-4 border border-white/20">
            <div className="text-center p-1 sm:p-2">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#02033b] to-[#51c3f2]">
                <CountUp
                  end={data.stats.total_datasets}
                  start={0}
                  duration={2.5}
                  separator=","
                />
              </p>
              <p className="text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2 text-gray-600">
                Total Dataset
              </p>
            </div>
            <div className="text-center p-1 sm:p-2">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#02033b] to-[#51c3f2]">
                <CountUp
                  end={data.stats.total_organizations}
                  start={0}
                  duration={2.5}
                  separator=","
                />
              </p>
              <p className="text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2 text-gray-600">
                Organisasi
              </p>
            </div>
            <div className="text-center p-1 sm:p-2">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#02033b] to-[#51c3f2]">
                <CountUp
                  end={data.stats.total_infografis}
                  start={0}
                  duration={2.5}
                  separator=","
                />
              </p>
              <p className="text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2 text-gray-600">
                Infografis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infografis Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white z-10">
        <div className="container mx-auto px-0"> 
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 px-4 sm:px-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-3 h-10 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-4"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#02033b]">
                Infografis <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9]">Terbaru</span>
              </h2>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-[#51c3f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div 
              ref={infografisRef}
              className="overflow-x-auto w-full py-4 no-scrollbar px-4 sm:px-6"
            >
              <div className="flex gap-6 w-max">
                {data.infografis.map((item) => (
                  <Link
                    key={item.id}
                    to={`/infografis/${item.id}`}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group/card"
                  >
                    <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/default-infografis.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-[#02033b] mb-3 group-hover/card:text-[#51c3f2] transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-[#51c3f2] font-semibold text-sm sm:text-base group-hover:text-[#3a9ec9] transition-colors">
                        Lihat Halaman
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-[#51c3f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Data Sektor Section */}
      <section id="sektor-section" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-[#f8fafd]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center mb-4">
              <div className="w-3 h-10 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-4"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#02033b]">
                Jelajahi Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9]">Berdasarkan Sektor</span>
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan data yang Anda butuhkan berdasarkan kategori sektor tertentu
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {(showAllSectors ? data.sectors : data.sectors.slice(0, 10)).map((sector, index) => (
              <Link
                key={sector.id}
                to={`/metadata?sector=${encodeURIComponent(sector.name)}`}
                className="block"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "backOut"
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex flex-col items-center hover:shadow-lg hover:border-transparent group relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#51c3f2]/15 to-[#f6c041]/15 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                  
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl mb-4 overflow-hidden flex items-center justify-center p-3 sm:p-4 relative z-10">
                    <motion.img 
                      src={sector.icon_url || '/images/default-sector.png'}
                      alt={sector.name}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <h3 className="text-center text-sm sm:text-base font-medium text-[#02033b] group-hover:text-[#51c3f2] transition-colors relative z-10">
                    {sector.name}
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ 
              delay: 0.8, 
              duration: 0.8,
              ease: "backOut"
            }}
            className="mt-12 sm:mt-16 text-center"
          >
            <button 
              onClick={() => setShowAllSectors(!showAllSectors)}
              className="px-8 py-3 bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center text-base"
            >
              {showAllSectors ? 'Sembunyikan Beberapa Sektor' : 'Lihat Semua Sektor'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ml-2 transition-transform ${showAllSectors ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;