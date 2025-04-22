import React, { useRef } from "react";
import Layout from "../components/Layout";
import CountUp from 'react-countup';

const HomePage = () => {
  // Data samples
  const infografisData = [
    {
      id: 1,
      title: "Data Strategis Perekonomian Kota Parepare",
      imageUrl: "/images/infografis1.png",
    },
    {
      id: 2,
      title: "Informasi Terbaru",
      imageUrl: "/images/infografis2.png",
    },
    {
      id: 3,
      title: "Informasi Terbaru",
      imageUrl: "/images/infografis3.png",
    },
    {
      id: 4,
      title: "Informasi Terbaru",
      imageUrl: "/images/infografis4.png",
    },
    {
      id: 5,
      title: "Informasi Terbaru",
      imageUrl: "/images/infografis5.png",
    },
  ];
  
  const sektorData = [
    { name: "Pertanian", image: "/images/pertanian.png" },
    { name: "Keuangan", image: "/images/keuangan.png" },
    { name: "Kesehatan", image: "/images/kesehatan.png" },
    { name: "Telekomunikasi", image: "/images/telekomunikasi.png" },
    { name: "Perdagangan", image: "/images/perdagangan.png" },
    { name: "Pendidikan", image: "/images/pendidikan.png" },
    { name: "Industri", image: "/images/industri.png" },
    { name: "Pariwisata", image: "/images/pariwisata.png" },
    { name: "Geografis", image: "/images/geografis.png" },
    { name: "Pemerintahan", image: "/images/pemerintahan.png" },
    { name: "Sosial", image: "/images/sosial.png" },
    { name: "Kependudukan", image: "/images/kependudukan.png" },
    { name: "Transportasi", image: "/images/transportasi.png" },
  ];

  const infografisRef = useRef(null);

  const scrollLeft = () => {
    if (infografisRef.current) {
      infografisRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (infografisRef.current) {
      infografisRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const [showAllSectors, setShowAllSectors] = React.useState(false);

  return (
    <Layout>
      {/* Section  */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] bg-gradient-to-br from-[#e8f1ff] to-[#d6e6ff] overflow-hidden pt-20 lg:pt-0">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#51c3f2] rounded-full filter blur-[80px] opacity-20 animate-float"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#f6c041] rounded-full filter blur-[100px] opacity-15 animate-float-delay"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full pt-12 lg:pt-0">
            {/* Left Column - Title */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10 mt-10 lg:mt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-tight lg:leading-[80px] text-[#02033b] tracking-tight">
                Satu Data <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9]">
                  Kota Parepare
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
                  className="relative w-full h-14 sm:h-16 pl-6 pr-28 bg-transparent rounded-xl focus:outline-none text-base sm:text-lg z-10"
                  placeholder="Cari data..."
                />
                <button className="absolute right-2 top-2 h-10 sm:h-12 w-24 sm:w-28 bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] rounded-lg flex items-center justify-center text-white font-semibold text-base transition-all duration-300 z-10 shadow-md hover:shadow-lg">
                  Cari
                </button>
              </div>
              
              {/* Data Sektor Button */}
              <div className="mt-8 sm:mt-10">
                <button className="w-48 h-12 bg-gradient-to-r from-[#f6c041] to-[#e18335] hover:from-[#e0a82a] hover:to-[#d1721a] rounded-xl text-white font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-base group">
                  <span>Data Sektor</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right Column - Modern Image/GIF Display - Hidden on mobile */}
            <div className="hidden lg:block w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 lg:pl-12 flex justify-center items-center z-10">
              <div className="relative w-full max-w-2xl">
                {/* Modern frame with gradient border */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#51c3f2] via-[#f6c041] to-[#e18335] rounded-2xl opacity-70 blur-md animate-rotate-colors"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                  <img 
                    src="/images/gambardata.gif" 
                    alt="Visualisasi Data Parepare"
                    className="w-full h-auto object-cover"
                  />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#51c3f2] rounded-2xl opacity-20 filter blur-xl animate-pulse-slow"></div>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#f6c041] rounded-full opacity-20 filter blur-xl animate-pulse-slower"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Modern Design - Adjusted spacing */}
        <div className="container mx-auto px-4 sm:px-6 lg:absolute lg:bottom-2 lg:left-0 lg:right-0 z-10 mt-8 sm:mt-12 lg:mt-0">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 max-w-4xl mx-auto grid grid-cols-3 gap-4 border border-white/20">
            {[
              { value: 500, label: "Total Dataset" },
              { value: 59, label: "Organisasi" },
              { value: 650, label: "Infografis" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-2">
                <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#02033b] to-[#51c3f2]">
                  <CountUp 
                    end={stat.value}
                    start={0}
                    duration={2.5}
                    separator=","
                    suffix={index === 0 ? "+" : ""}
                  />
                </p>
                <p className="text-sm sm:text-base font-medium mt-2 text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infografis Section - Modern Carousel */}
      <section className="py-16 sm:py-20 lg:py-28 relative bg-white">
        <div className="container mx-auto px-0"> 
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 px-4 sm:px-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-3 h-10 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-4"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#02033b]">
                Infografis <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9]">Terbaru</span>
              </h2>
            </div>
          </div>

          {/* Modern Card Carousel - Full Width */}
          <div className="relative">
            {/* Navigation Buttons - Positioned on sides */}
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
                {infografisData.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group/card"
                  >
                    <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-[#02033b] mb-3 group-hover/card:text-[#51c3f2] transition-colors">
                        {item.title}
                      </h3>
                      <button className="flex items-center text-[#51c3f2] font-semibold text-sm sm:text-base group-hover:text-[#3a9ec9] transition-colors">
                        Lihat Halaman
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
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

      {/* Data Sektor Section - Modern Grid */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-[#f8fafd]">
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
            {(showAllSectors ? sektorData : sektorData.slice(0, 10)).map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex flex-col items-center hover:shadow-lg transition-all hover:-translate-y-2 hover:border-transparent group relative overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#51c3f2]/10 to-[#f6c041]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl mb-4 overflow-hidden flex items-center justify-center p-3 sm:p-4 relative z-10">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center text-sm sm:text-base font-medium text-[#02033b] group-hover:text-[#51c3f2] transition-colors relative z-10">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 sm:mt-16 text-center">
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;