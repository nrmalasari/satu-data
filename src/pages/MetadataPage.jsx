import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiDownload, FiEye, FiFilter, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Layout from "../components/Layout";
import { getDatasets, getOrganizations, getSectors, incrementViewCount } from '../services/api';

const MetadataPage = () => {
  const [data, setData] = useState({
    datasets: [],
    organizations: [],
    sectors: [],
    loading: true,
    error: null
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [orgSearchTerm, setOrgSearchTerm] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevan");
  const itemsPerPage = 6;

  const location = useLocation();

  // Extract query parameters and update state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sector = params.get('sector');
    const year = params.get('year');
    const query = params.get('q');

    if (sector) {
      setSelectedSectors([decodeURIComponent(sector)]);
    }
    if (year) {
      setSelectedYears([year]);
    }
    if (query) {
      setSearchTerm(decodeURIComponent(query));
    }
    setCurrentPage(1);
  }, [location.search]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datasets, organizations, sectors] = await Promise.all([
          getDatasets(),
          getOrganizations(),
          getSectors()
        ]);

        console.log("Fetched organizations:", organizations);
        console.log("Fetched datasets:", datasets);
        console.log("Fetched sectors:", sectors);

        setData({
          datasets: datasets || [],
          organizations: organizations || [],
          sectors: sectors || [],
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchData();
  }, []);

  const years = [...new Set(data.datasets.map(item => item.year).filter(year => year))].sort((a, b) => b - a);

  const filteredItems = data.datasets
    .filter(item => {
      const matchesSearch =
        (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.organization?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.file_type || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOrg = selectedOrgs.length === 0 || selectedOrgs.includes(item.organization?.name);
      const matchesYear = selectedYears.length === 0 || selectedYears.includes(String(item.year));
      const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(item.sector?.name);

      return matchesSearch && matchesOrg && matchesYear && matchesSector;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "newest":
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        case "oldest":
          return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        case "downloads":
          return (b.downloads || 0) - (a.downloads || 0);
        case "relevan":
        default:
          const aMatch = (a.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
          const bMatch = (b.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
          return bMatch - aMatch || (b.views || 0) - (a.views || 0);
      }
    });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleOrg = (org) => {
    console.log("Toggling organization:", org);
    console.log("Current selectedOrgs:", selectedOrgs);
    setSelectedOrgs(prev => {
      const newSelected = prev.includes(org) ? prev.filter(o => o !== org) : [...prev, org];
      console.log("New selectedOrgs:", newSelected);
      return newSelected;
    });
    setCurrentPage(1);
  };

  const toggleYear = (year) => {
    console.log("Toggling year:", year);
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
    setCurrentPage(1);
  };

  const toggleSector = (sector) => {
    console.log("Toggling sector:", sector);
    setSelectedSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedOrgs([]);
    setSelectedYears([]);
    setSelectedSectors([]);
    setSearchTerm("");
    setOrgSearchTerm("");
    setSortBy("relevan");
    setCurrentPage(1);
  };

  const handleViewIncrement = async (datasetId) => {
    console.log(`Incrementing view for dataset ${datasetId}`);
    try {
      const response = await incrementViewCount(datasetId);
      if (response.status === 'success') {
        setData(prev => ({
          ...prev,
          datasets: prev.datasets.map(dataset =>
            dataset.id === datasetId
              ? { ...dataset, views: (dataset.views || 0) + 1 }
              : dataset
          )
        }));
        console.log(`Successfully incremented view for dataset ${datasetId}`);
      } else if (response.status === 'already_incremented') {
        console.log(`View increment throttled for dataset ${datasetId}`);
      }
    } catch (err) {
      console.error(`Failed to increment view count for dataset ${datasetId}:`, err);
    }
  };

  const filteredOrgs = data.organizations.filter(org =>
    (org.name || "").toLowerCase().includes(orgSearchTerm.toLowerCase())
  );

  if (data.loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

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
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-40 pb-18 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#51c3f2] rounded-full filter blur-[80px] opacity-20 animate-float"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#f6c041] rounded-full filter blur-[100px] opacity-15 animate-float-delay"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              METADATA {selectedYears.length > 0 ? selectedYears[0] : ''}
            </h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Temukan dataset terbuka dari berbagai organisasi pemerintah daerah dengan metadata terstruktur
            </p>
          </div>
        </div>

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
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

                <div className="mb-6">
                  <h4 className="font-medium text-[#02033b] mb-3">Tahun</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {years.length === 0 ? (
                      <p className="text-gray-500 text-sm">Tidak ada tahun ditemukan</p>
                    ) : (
                      years.map((year) => (
                        <div key={year} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`year-${year}`}
                            className="w-4 h-4 rounded border-gray-300 text-[#3a9ec9] focus:ring-[#3a9ec9]"
                            checked={selectedYears.includes(String(year))}
                            onChange={() => toggleYear(String(year))}
                          />
                          <label
                            htmlFor={`year-${year}`}
                            className="ml-2 text-gray-700 text-sm hover:text-[#02033b] cursor-pointer transition-colors"
                            onClick={() => toggleYear(String(year))}
                          >
                            {year}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>

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
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                    {filteredOrgs.length === 0 ? (
                      <p className="text-gray-500 text-sm">Tidak ada organisasi ditemukan</p>
                    ) : (
                      filteredOrgs.map((org) => (
                        <div key={org.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`org-${org.id}`}
                            className="w-4 h-4 rounded border-gray-300 text-[#3a9ec9] focus:ring-[#3a9ec9]"
                            checked={selectedOrgs.includes(org.name)}
                            onChange={() => toggleOrg(org.name)}
                          />
                          <label
                            htmlFor={`org-${org.id}`}
                            className="ml-2 text-gray-700 text-sm hover:text-[#02033b] cursor-pointer transition-colors"
                            onClick={() => toggleOrg(org.name)}
                          >
                            {org.name || "Unknown"}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-[#02033b] mb-3">Sektor</h4>
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                    {data.sectors.length === 0 ? (
                      <p className="text-gray-500 text-sm">Tidak ada sektor ditemukan</p>
                    ) : (
                      data.sectors.map((sector) => (
                        <div key={sector.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`sector-${sector.id}`}
                            className="w-4 h-4 rounded border-gray-300 text-[#3a9ec9] focus:ring-[#3a9ec9]"
                            checked={selectedSectors.includes(sector.name)}
                            onChange={() => toggleSector(sector.name)}
                          />
                          <label
                            htmlFor={`sector-${sector.id}`}
                            className="ml-2 text-gray-700 text-sm hover:text-[#02033b] cursor-pointer transition-colors"
                            onClick={() => toggleSector(sector.name)}
                          >
                            {sector.name || "Unknown"}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center overflow-hidden">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-3"></div>
                  <h2 className="font-bold text-[#02033b] text-xl">
                    {filteredItems.length} Dataset Ditemukan
                    {selectedYears.length > 0 ? ` (Tahun ${selectedYears.join(', ')})` : ''}
                    {selectedSectors.length > 0 ? ` (Sektor ${selectedSectors.join(', ')})` : ''}
                  </h2>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-500 whitespace-nowrap">Urutkan berdasarkan:</span>
                  <select
                    className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] focus:border-transparent bg-white w-full sm:w-40 max-w-full"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="relevan">Paling Relevan</option>
                    <option value="views">Paling Banyak Dilihat</option>
                    <option value="downloads">Paling Banyak Diunduh</option>
                    <option value="newest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                  </select>
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <>
                  <div className="space-y-5">
                    {displayedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
                      >
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex-1">
                              <Link
                                to={`/datasets/${item.id}`}
                                onClick={() => handleViewIncrement(item.id)}
                              >
                                <h3 className="text-xl font-bold text-[#02033b] group-hover:text-[#3a9ec9] mb-2 cursor-pointer transition-colors">
                                  {item.title || "Untitled Dataset"}
                                </h3>
                              </Link>
                              <div className="flex flex-wrap items-center gap-3 mt-3 mb-4">
                                <span className="bg-[#e1f5fe] text-[#3a9ec9] text-xs px-3 py-1.5 rounded-lg font-medium">
                                  {item.file_type || "N/A"}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {item.organization?.name || "Unknown"} • {item.year || "N/A"}
                                </span>
                                <span className="text-sm text-gray-600">
                                  Sektor: <span className="font-medium">{item.sector?.name || "N/A"}</span>
                                </span>
                              </div>
                            </div>
                            <a
                              href={item.file_url || "#"}
                              download
                              className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center transition-all hover:shadow-md whitespace-nowrap"
                            >
                              <FiDownload className="mr-2" /> Unduh
                            </a>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 pt-5 border-t border-gray-100 gap-3">
                            <div className="flex flex-wrap gap-5">
                              <div className="flex items-center text-sm text-gray-600">
                                <FiEye className="mr-1.5 text-[#3a9ec9]" /> {(item.views || 0).toLocaleString()} kali dilihat
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <FiDownload className="mr-1.5 text-[#3a9ec9]" /> {(item.downloads || 0).toLocaleString()} kali diunduh
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              Terakhir diperbarui: {item.updated_at ? new Date(item.updated_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              }) : "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm sm">
                            <span>Tingkat popularitas dataset</span>
                            <span>{Math.round((item?.views || 0) / 30)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] h-2 rounded-full"
                              style={{ width: `${Math.min(100, (item.views || 0) / 3)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                        >
                          <FiChevronLeft className="mr-1" /> Sebelumnya
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
                          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                        >
                          Berikutnya <FiChevronRight className="ml-1" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MetadataPage;