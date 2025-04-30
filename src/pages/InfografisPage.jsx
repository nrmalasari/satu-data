import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { FiSearch, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";

const InfografisPage = () => {
  // Data infografis
  const infografisData = [
    {
      id: 1,
      title: "Potret Pertanian Parepare 2024: Luas Perkebunan, Produksi Ternak, dan Upaya Meningkatkan Produktivitas Pertanian",
      imageUrl: "/images/infografis1.png",
      date: "19 Maret 2025",
      views: 1200,
      category: "Pertanian"
    },
    {
      id: 2,
      title: "Langkah Dinas Kesehatan Kota Parepare dalam Memutus Rantai Penularan Tuberkulosis dengan Deteksi Dini",
      imageUrl: "/images/infografis2.png",
      date: "12 Maret 2025",
      views: 980,
      category: "Kesehatan"
    },
    {
      id: 3,
      title: "Perkembangan Ekonomi Kota Parepare Triwulan IV 2024",
      imageUrl: "/images/infografis3.png",
      date: "5 Maret 2025",
      views: 1500,
      category: "Ekonomi"
    },
    {
      id: 4,
      title: "Profil Kependudukan Kota Parepare Tahun 2024",
      imageUrl: "/images/infografis4.png",
      date: "28 Februari 2025",
      views: 1800,
      category: "Kependudukan"
    },
    {
      id: 5,
      title: "Indeks Pembangunan Manusia (IPM) Kota Parepare 2024",
      imageUrl: "/images/infografis5.png",
      date: "21 Februari 2025",
      views: 1350,
      category: "Sosial"
    },
    {
      id: 6,
      title: "Statistik Pendidikan Kota Parepare Tahun Ajaran 2024/2025",
      imageUrl: "/images/infografis6.png",
      date: "14 Februari 2025",
      views: 1100,
      category: "Pendidikan"
    }
  ];

  // Categories for filter
  const categories = [
    "Semua",
    "Pertanian",
    "Kesehatan",
    "Ekonomi",
    "Kependudukan",
    "Sosial",
    "Pendidikan",
    "Telekomunikasi",
    "Keuangan",
    "Geografis",
    "Transportasi",
    "Industri",
    "Pariwisata"
  ];

  // State for filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const infografisRef = useRef(null);

  // Filter data
  const filteredData = infografisData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const itemsPerPage = 4; // Changed to show 2 rows of 2 infographics
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll functions
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

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-40 pb-18 text-center text-white relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#51c3f2] rounded-full filter blur-[80px] opacity-20 animate-float"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#f6c041] rounded-full filter blur-[100px] opacity-15 animate-float-delay"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">Infografis</h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Kumpulan infografis data Kota Parepare yang informatif dan mudah dipahami
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          {/* Search and Filter Section */}
          <div className="max-w-5xl mx-auto px-4 -mt-28 mb-8 relative z-10">
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow group">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <FiSearch className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                placeholder="Cari infografis..."
                className="w-full h-14 pl-12 pr-32 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] text-gray-700 placeholder-gray-400 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter - Horizontal Scroll */}
          <div className="relative mb-10 max-w-5xl mx-auto px-4">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-all z-10 group"
            >
              <FiChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-[#3a9ec9]" />
            </button>
            
            <div 
              ref={infografisRef}
              className="overflow-x-auto no-scrollbar px-12"
            >
              <div className="flex gap-2 w-max mx-auto">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-all z-10 group"
            >
              <FiChevronRight className="h-5 w-5 text-gray-600 group-hover:text-[#3a9ec9]" />
            </button>
          </div>

          {/* Results Header */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center mb-3 sm:mb-0">
                <div className="w-3 h-8 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-3"></div>
                <h2 className="font-bold text-[#02033b] text-xl">
                  {filteredData.length} Infografis Ditemukan
                </h2>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-500 whitespace-nowrap">Urutkan:</span>
                <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] focus:border-transparent bg-white">
                  <option>Terbaru</option>
                  <option>Paling Banyak Dilihat</option>
                  <option>Judul A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Infografis Grid */}
          {filteredData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                {paginatedData.map((item) => (
                  <div 
                    key={item.id}
                    className="w-full max-w-[650px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    {/* Header Infografis */}
                    <div className="bg-[#3a9ec9] py-3 text-center">
                      <span className="font-bold text-white text-lg tracking-wider">INFOGRAFIS</span>
                    </div>
                    
                    {/* Image Container */}
                    <div className="p-6 pb-0">
                      <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-auto max-h-full object-scale-down"
                        />
                        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 pt-4">
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-800 mb-6 line-clamp-3 leading-relaxed">
                        {item.title}
                      </h3>
                      
                      {/* Category Badge */}
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Release Date and Views */}
                      <div className="mt-6 flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-600">
                          RELEASE {item.date}
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-600">
                          <FiEye className="mr-1" />
                          {item.views.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <nav className="flex items-center space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Sebelumnya
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                    <button 
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        currentPage === num 
                          ? 'bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] text-white border-transparent' 
                          : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Berikutnya
                  </button>
                </nav>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10 text-center">
              <div className="mx-auto w-16 h-16 bg-[#e1f5fe] rounded-full flex items-center justify-center text-[#3a9ec9] mb-5">
                <FiSearch className="text-2xl" />
              </div>
              <h3 className="text-xl font-medium text-[#02033b] mb-2">
                Tidak ada infografis ditemukan
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Coba gunakan kata kunci atau kategori yang berbeda
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Semua");
                }}
                className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InfografisPage;