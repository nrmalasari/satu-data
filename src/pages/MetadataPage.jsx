import React, { useState } from "react";
import { FiSearch, FiDownload, FiEye, FiChevronRight, FiFilter, FiX } from "react-icons/fi";
import Layout from "../components/Layout";

const MetadataPage = () => {
  // Sample metadata data
  const metadataItems = [
    {
      id: 1,
      title: "PENAMBAHAN PENGGUNA DAN PEMILIK SERTIFIKAT ELEKTRONIK TAHUN 2024",
      date: "6 March, 2025",
      source: "Dinas Komunikasi dan Informatika",
      views: 1896,
      downloads: 842,
      type: "PDF",
      year: 2024,
      sector: "TEKNOLOGI INFORMASI"
    },
    {
      id: 2,
      title: "SURVEY KEPUASAN MASYARAKAT (SKM) RSUD ANDI MAKKASAU KOTA PAREPARE TAHUN 2021",
      date: "2 December, 2021",
      source: "Dinas Kesehatan",
      views: 1896,
      downloads: 721,
      type: "DOCX",
      year: 2021,
      sector: "KESEHATAN"
    },
    {
      id: 3,
      title: "STATISTIK DAERAH KOTA PAREPARE 2023",
      date: "15 January, 2023",
      source: "BAPPEDA",
      views: 2453,
      downloads: 1102,
      type: "PDF",
      year: 2023,
      sector: "EKONOMI"
    },
    {
      id: 4,
      title: "INDEKS PEMBANGUNAN MANUSIA KOTA PAREPARE 2022",
      date: "3 May, 2022",
      source: "BAPPEDA",
      views: 1789,
      downloads: 893,
      type: "XLSX",
      year: 2022,
      sector: "SOSIAL"
    },
    {
      id: 5,
      title: "DATA PERTANIAN KOTA PAREPARE 2024",
      date: "10 February, 2024",
      source: "Dinas Pertanian",
      views: 1250,
      downloads: 567,
      type: "PDF",
      year: 2024,
      sector: "PERTANIAN"
    },
    {
      id: 6,
      title: "STATISTIK PENDIDIKAN KOTA PAREPARE 2023",
      date: "22 March, 2023",
      source: "Dinas Pendidikan",
      views: 2100,
      downloads: 978,
      type: "PDF",
      year: 2023,
      sector: "PENDIDIKAN"
    }
  ];

  const organizations = [
    "Dinas Komunikasi dan Informatika",
    "BAPPEDA",
    "Badan Keuangan Daerah",
    "Dinas Kesehatan",
    "Dinas Perdagangan",
    "Dinas Kependudukan dan Pencatatan Sipil",
    "Dinas Tenaga Kerja",
    "Dinas Perumahan, Permukiman dan Pertahanan",
    "Inspektorat",
    "Badan Kesatuan Bangsa dan Politik",
    "Dinas Kepemudaan, Olahraga dan Pariwisata",
    "Dinas Perhubungan",
    "Dinas Pendidikan dan Kebudayaan",
    "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
    "Dinas Pekerjaan Umum dan Penataan Ruang",
    "Dinas Pemadam Kebakaran",
    "Sekretariat Daerah",
    "Sekretariat DPR",
    "Dinas Satuan Polisi Pamong Praja",
    "Dinas Sosial",
    "Dinas Pertanian",
    "Dinas Lingkungan Hidup",
    "Dinas Perikanan",
    "Dinas Perindustrian"
  ];

  const years = [2024, 2023, 2022, 2021, 2020];
  const sectors = [
    "TEKNOLOGI INFORMASI",
    "KESEHATAN",
    "EKONOMI",
    "SOSIAL",
    "PERTANIAN",
    "PENDIDIKAN",
    "INFRASTRUKTUR",
    "KEUANGAN",
    "TRANSPORTASI",
    "ENERGI",
    "LINGKUNGAN",
    "PARIWISATA"
  ];

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [orgSearchTerm, setOrgSearchTerm] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filtered data
  const filteredItems = metadataItems.filter(item => {
    // Search term filter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Organization filter
    const matchesOrg = selectedOrgs.length === 0 || selectedOrgs.includes(item.source);
    
    // Year filter
    const matchesYear = selectedYears.length === 0 || selectedYears.includes(item.year);
    
    // Sector filter
    const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(item.sector);
    
    return matchesSearch && matchesOrg && matchesYear && matchesSector;
  });

  // Toggle organization selection
  const toggleOrg = (org) => {
    if (selectedOrgs.includes(org)) {
      setSelectedOrgs(selectedOrgs.filter(o => o !== org));
    } else {
      setSelectedOrgs([...selectedOrgs, org]);
    }
  };

  // Toggle year selection
  const toggleYear = (year) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter(y => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  // Toggle sector selection
  const toggleSector = (sector) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedOrgs([]);
    setSelectedYears([]);
    setSelectedSectors([]);
    setSearchTerm("");
    setOrgSearchTerm("");
  };

  // Filter organizations based on search
  const filteredOrgs = organizations.filter(org => 
    org.toLowerCase().includes(orgSearchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Header Section - Modern Gradient */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-40 pb-18 text-center text-white relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#51c3f2] rounded-full filter blur-[80px] opacity-20 animate-float"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#f6c041] rounded-full filter blur-[100px] opacity-15 animate-float-delay"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              METADATA
            </h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Temukan dataset terbuka dari berbagai organisasi pemerintah daerah dengan metadata terstruktur
            </p>
          </div>
        </div>

        {/* Search Section - Modern Design */}
        <div className="max-w-5xl mx-auto px-4 -mt-8 mb-8 relative z-10">
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow group">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <FiSearch className="text-gray-400 text-xl" />
            </div>
            <input
              type="text"
              placeholder="Cari dataset, organisasi, atau jenis file..."
              className="w-full h-14 pl-12 pr-32 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] text-gray-700 placeholder-gray-400 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button 
                className="bg-gradient-to-r from-[#f6c041] to-[#e18335] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all hover:shadow-md"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <FiFilter className="mr-2" /> Filter
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters - Modern Design */}
            <div className={`w-full lg:w-1/4 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#02033b] text-lg">Filters</h3>
                  <button 
                    onClick={resetFilters}
                    className="text-[#3a9ec9] text-sm font-medium hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                {/* Organisasi Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#02033b] mb-3">Organisasi</h4>
                  <div className="relative mb-3">
                    <input
                      type="text"
                      placeholder="Cari organisasi..."
                      className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] focus:border-transparent text-sm"
                      value={orgSearchTerm}
                      onChange={(e) => setOrgSearchTerm(e.target.value)}
                    />
                    <FiSearch className="absolute right-2.5 top-2.5 text-gray-400" />
                  </div>
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                    {filteredOrgs.map((org, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`org-${index}`}
                          className="w-4 h-4 rounded border-gray-300 text-[#3a9ec9] focus:ring-[#3a9ec9]"
                          checked={selectedOrgs.includes(org)}
                          onChange={() => toggleOrg(org)}
                        />
                        <label htmlFor={`org-${index}`} className="ml-2 text-gray-700 text-sm hover:text-[#02033b] cursor-pointer transition-colors">
                          {org}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tahun Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#02033b] mb-3">Tahun</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {years.map((year) => (
                      <div key={year} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`year-${year}`}
                          className="w-4 h-4 rounded border-gray-300 text-[#3a9ec9] focus:ring-[#3a9ec9]"
                          checked={selectedYears.includes(year)}
                          onChange={() => toggleYear(year)}
                        />
                        <label htmlFor={`year-${year}`} className="ml-2 text-gray-700 text-sm hover:text-[#02033b] cursor-pointer transition-colors">
                          {year}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sektor Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#02033b] mb-3">Sektor</h4>
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                    {sectors.map((sector, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`sector-${index}`}
                          className="w-4 h-4 rounded border-gray-300 text-[#3a9ec9] focus:ring-[#3a9ec9]"
                          checked={selectedSectors.includes(sector)}
                          onChange={() => toggleSector(sector)}
                        />
                        <label htmlFor={`sector-${index}`} className="ml-2 text-gray-700 text-sm hover:text-[#02033b] cursor-pointer transition-colors">
                          {sector}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Konten Kanan - Daftar Metadata */}
            <div className="w-full lg:w-3/4">
              {/* Header Hasil Pencarian */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-3"></div>
                  <h2 className="font-bold text-[#02033b] text-xl">
                    {filteredItems.length} Dataset Ditemukan
                  </h2>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-500 whitespace-nowrap">Urutkan berdasarkan:</span>
                  <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] focus:border-transparent bg-white">
                    <option>Paling Relevan</option>
                    <option>Paling Banyak Dilihat</option>
                    <option>Terbaru</option>
                    <option>Terlama</option>
                  </select>
                </div>
              </div>

              {/* Item Metadata - Desain Kartu Modern */}
              {filteredItems.length > 0 ? (
                <div className="space-y-5">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all overflow-hidden group">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#02033b] group-hover:text-[#3a9ec9] mb-2 cursor-pointer transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mt-3 mb-4">
                              <span className="bg-[#e1f5fe] text-[#3a9ec9] text-xs px-3 py-1.5 rounded-lg font-medium">
                                {item.type}
                              </span>
                              <span className="text-sm text-gray-600">
                                {item.source} • {item.year}
                              </span>
                              <span className="text-sm text-gray-600">
                                Sektor: <span className="font-medium">{item.sector}</span>
                              </span>
                            </div>
                          </div>
                          <button className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center transition-all hover:shadow-md whitespace-nowrap">
                            <FiDownload className="mr-2" /> Unduh
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 pt-5 border-t border-gray-100 gap-3">
                          <div className="flex flex-wrap gap-5">
                            <div className="flex items-center text-sm text-gray-600">
                              <FiEye className="mr-1.5 text-[#3a9ec9]" /> {item.views.toLocaleString()} kali dilihat
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FiDownload className="mr-1.5 text-[#3a9ec9]" /> {item.downloads.toLocaleString()} kali diunduh
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Terakhir diperbarui: {item.date}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Tingkat popularitas dataset</span>
                          <span>{Math.round(item.views / 30)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] h-2 rounded-full" 
                            style={{ width: `${Math.min(100, item.views / 30)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10 text-center">
                  <div className="mx-auto w-16 h-16 bg-[#e1f5fe] rounded-full flex items-center justify-center text-[#3a9ec9] mb-5">
                    <FiX className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-medium text-[#02033b] mb-2">
                    Tidak ada hasil yang cocok
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Coba sesuaikan filter pencarian atau gunakan kata kunci yang berbeda
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                  >
                    Atur Ulang Filter
                  </button>
                </div>
              )}

              {/* Pagination Modern */}
              {filteredItems.length > 0 && (
                <div className="flex justify-center mt-10">
                  <nav className="flex items-center space-x-2">
                    <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Sebelumnya
                    </button>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button 
                        key={num}
                        className={`px-4 py-2 rounded-lg border ${num === 1 ? 'bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] text-white border-transparent' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300'}`}
                      >
                        {num}
                      </button>
                    ))}
                    <button className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                      Berikutnya
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default MetadataPage;