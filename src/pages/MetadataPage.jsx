import React, { useState } from "react";
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
      <div className="bg-[#f3f8ff] min-h-screen pb-20">
        {/* Header Section */}
        <div className="pt-28 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#02033b]">
            METADATA
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan dataset terbuka dari berbagai organisasi pemerintah daerah
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
            <div className="relative flex bg-white rounded-full shadow-lg border border-gray-200">
                {/* File Type Dropdown */}
                <div className="relative group">
                <button className="flex items-center justify-between px-4 h-14 rounded-l-full bg-[#51c3f2] text-white font-medium focus:outline-none">
                    <span>All</span>
                    <svg 
                    className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-1 w-40 bg-white rounded-lg shadow-xl z-10 hidden group-hover:block">
                    <div className="py-1">
                    {['PDF', 'DOCX', 'XLSX', 'CSV', 'JSON', 'XML'].map((type) => (
                        <button
                        key={type}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                            setSearchTerm(type);
                        }}
                        >
                        {type}
                        </button>
                    ))}
                    </div>
                </div>
                </div>

                {/* Search Input */}
                <input
                type="text"
                placeholder="Cari dataset"
                className="flex-1 h-14 pl-4 pr-14 focus:outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                {/* Search Icon */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg 
                    className="w-6 h-6 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
            </div>
        </div>
        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4">
            <button 
              className="w-full flex justify-between items-center bg-white rounded-lg shadow-md p-4"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <span className="font-medium">Filters</span>
              <span className="text-gray-500">
                {filteredItems.length} items
              </span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <div className={`w-full lg:w-1/4 bg-white rounded-2xl shadow-xl p-6 h-fit lg:sticky lg:top-4 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
              {/* Organisasi Filter */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-[#e18335] rounded-full mr-3"></div>
                  <h3 className="font-semibold text-lg">Organisasi</h3>
                </div>
                
                {/* Organization search */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari organisasi..."
                      className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#51c3f2] focus:border-transparent text-sm"
                      value={orgSearchTerm}
                      onChange={(e) => setOrgSearchTerm(e.target.value)}
                    />
                    <div className="absolute right-3 top-2.5">
                      <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pl-4 max-h-64 overflow-y-auto pr-2">
                  {filteredOrgs.map((org, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`org-${index}`}
                        className="w-4 h-4 rounded border-gray-300 text-[#51c3f2] focus:ring-[#51c3f2]"
                        checked={selectedOrgs.includes(org)}
                        onChange={() => toggleOrg(org)}
                      />
                      <label htmlFor={`org-${index}`} className="ml-3 text-gray-700 text-sm">
                        {org}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tahun Metadata Filter */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-[#e18335] rounded-full mr-3"></div>
                  <h3 className="font-semibold text-lg">Tahun Metadata</h3>
                </div>
                <div className="space-y-3 pl-4">
                  {years.map((year) => (
                    <div key={year} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`year-${year}`}
                        className="w-4 h-4 rounded border-gray-300 text-[#51c3f2] focus:ring-[#51c3f2]"
                        checked={selectedYears.includes(year)}
                        onChange={() => toggleYear(year)}
                      />
                      <label htmlFor={`year-${year}`} className="ml-3 text-gray-700 text-sm">
                        METADATA {year}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sektor Data Filter */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-[#e18335] rounded-full mr-3"></div>
                  <h3 className="font-semibold text-lg">Sektor Data</h3>
                </div>
                <div className="space-y-3 pl-4 max-h-64 overflow-y-auto pr-2">
                  {sectors.map((sector, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`sector-${index}`}
                        className="w-4 h-4 rounded border-gray-300 text-[#51c3f2] focus:ring-[#51c3f2]"
                        checked={selectedSectors.includes(sector)}
                        onChange={() => toggleSector(sector)}
                      />
                      <label htmlFor={`sector-${index}`} className="ml-3 text-gray-700 text-sm">
                        {sector}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button */}
              <button 
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                onClick={resetFilters}
              >
                Reset Filter
              </button>
            </div>

            {/* Right Content - Metadata List */}
            <div className="w-full lg:w-3/4">
              {/* Results Count */}
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#02033b]">
                  Hasil Pencarian
                </h2>
                <p className="text-gray-500">
                  Menampilkan {filteredItems.length} dari {metadataItems.length} dataset
                </p>
              </div>

              {/* Metadata Items */}
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-xl p-6 mb-6 hover:shadow-2xl transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-xl font-medium text-[#02033b] hover:underline mb-2 md:mb-0 md:max-w-2xl cursor-pointer">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#e18335] rounded px-3 py-1 border border-gray-500">
                          <span className="text-white font-normal">{item.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-gray-500">
                          <span className="font-medium">Tanggal Publikasi:</span> {item.date}
                        </p>
                        <p className="text-gray-500 text-sm">
                          <span className="font-medium">Sumber:</span> {item.source}
                        </p>
                        <p className="text-gray-500 text-sm">
                          <span className="font-medium">Tahun Metadata:</span> METADATA {item.year}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-0 flex items-center space-x-6">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">{item.views}</span>
                          <svg 
                            className="w-5 h-5 text-gray-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>

                        <button className="bg-[#51c3f2] rounded px-4 py-1.5 text-white font-semibold flex items-center shadow hover:bg-[#3a9ec9] transition-colors">
                          <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Unduh
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Popularitas dataset</span>
                        <span>{Math.round(item.views / 30)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-[#51c3f2] h-2 rounded-full" 
                          style={{ width: `${Math.min(100, item.views / 30)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <svg 
                    className="w-16 h-16 mx-auto text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Coba ubah filter pencarian Anda atau gunakan kata kunci yang berbeda
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredItems.length > 0 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button 
                        key={num}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${num === 1 ? 'bg-[#51c3f2] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      >
                        {num}
                      </button>
                    ))}
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MetadataPage;