import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiArrowLeft, FiDatabase, FiSearch, FiDownload, FiEye, FiChevronRight } from 'react-icons/fi';
import { organizations } from './OrganisasiPage';

const OrganisasiDetailPage = () => {
  const { id } = useParams();
  const organization = organizations.find(org => org.id === parseInt(id));

  if (!organization) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h1 className="text-2xl font-bold text-[#02033b] mb-4">Organisasi tidak ditemukan</h1>
            <Link 
              to="/organisasi" 
              className="text-[#3a9ec9] hover:text-[#2a8bb7] flex items-center justify-center"
            >
              <FiArrowLeft className="mr-2" />
              Kembali ke Daftar Organisasi
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Sample datasets matching the metadata format (without value)
  const datasets = [
    {
      id: 1,
      title: "Persentase Kopesertaan Jaminan Kesehatan Parepare",
      date: "6 March, 2025",
      source: organization.name,
      views: 1896,
      downloads: 842,
      type: "PDF",
      year: 2024,
      sector: organization.sector
    },
    {
      id: 2,
      title: "Data Cakupan Neonatus dengan Komplikasi yang Ditangani",
      date: "2 December, 2021",
      source: organization.name,
      views: 1896,
      downloads: 721,
      type: "DOCX",
      year: 2021,
      sector: organization.sector
    },
    {
      id: 3,
      title: "Data Permasalahan Kesehatan yang Diintervensi oleh Tim Ketuk Pintu Layani dengan Hati (KPLDH)",
      date: "15 January, 2023",
      source: organization.name,
      views: 2453,
      downloads: 1102,
      type: "PDF",
      year: 2023,
      sector: organization.sector
    },
    {
      id: 4,
      title: "Persentase Tempat Pengelolaan Pangan (TPP) yang Memenuhi Syarat Sesuai Standar",
      date: "3 May, 2022",
      source: organization.name,
      views: 1789,
      downloads: 893,
      type: "XLSX",
      year: 2022,
      sector: organization.sector
    },
    {
      id: 5,
      title: "Persentase Penduduk Penderita Diabetes Mellitus yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
      date: "10 February, 2024",
      source: organization.name,
      views: 1250,
      downloads: 567,
      type: "PDF",
      year: 2024,
      sector: organization.sector
    }
  ];

  return (
    <Layout>
      <div className="from-[#e8f1ff] to-[#d6e6ff] min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-32 pb-16 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#51c3f2] rounded-full filter blur-[80px] opacity-20"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#f6c041] rounded-full filter blur-[100px] opacity-15"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Organization Info - Horizontal layout */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                {/* Logo Container */}
                <div className="w-20 h-20 rounded-lg bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0 border-2 border-white border-opacity-30">
                <img src={organization.logo} alt={organization.name} className="w-12 h-12 object-contain" />
                </div>
                
                {/* Organization Title and Description */}
                <div className="text-white">
                <h1 className="text-3xl font-bold uppercase">{organization.name}</h1>
                <p className="text-xl opacity-90">{organization.sector}</p>
                <p className="text-sm opacity-80 mt-2 max-w-2xl">{organization.description}</p>
                
                {/* Back Button - Mobile only, below description */}
                <div className="block md:hidden mt-4">
                    <Link 
                    to="/organisasi" 
                    className="flex items-center bg-[#f6c041] hover:bg-[#e18335] text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg w-fit"
                    >
                    <FiArrowLeft className="mr-2" />
                    Kembali
                    </Link>
                </div>
                </div>
            </div>

            {/* Back Button - Desktop only, right side */}
            <div className="hidden md:block">
                <Link 
                to="/organisasi" 
                className="flex items-center bg-[#f6c041] hover:bg-[#e18335] text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                <FiArrowLeft className="mr-2" />
                Kembali
                </Link>
            </div>
            </div>
        </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto px-4 -mt-8 mb-8 relative z-10">
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <FiSearch className="text-gray-400 text-xl" />
            </div>
            <input
              type="text"
              placeholder="Cari dataset..."
              className="w-full h-14 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] text-gray-700 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12">
          {/* Result Header */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center mb-3 sm:mb-0">
              <div className="w-3 h-8 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-3"></div>
              <h2 className="font-bold text-[#02033b] text-xl">
                {datasets.length} Dataset Ditemukan
              </h2>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-sm text-gray-500 whitespace-nowrap">Urutkan berdasarkan:</span>
              <select className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] focus:border-transparent bg-white">
                <option>Paling Relevan</option>
                <option>Terbaru</option>
                <option>Terlama</option>
              </select>
            </div>
          </div>

          {/* Dataset List - Updated to match MetadataPage style */}
          <div className="space-y-5">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all overflow-hidden group">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#02033b] group-hover:text-[#3a9ec9] mb-2 cursor-pointer">
                        {dataset.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-3 mb-4">
                        <span className="bg-[#e1f5fe] text-[#3a9ec9] text-xs px-3 py-1.5 rounded-lg font-medium">
                          {dataset.type}
                        </span>
                        <span className="text-sm text-gray-600">
                          {dataset.source} • {dataset.year}
                        </span>
                        <span className="text-sm text-gray-600">
                          Sektor: <span className="font-medium">{dataset.sector}</span>
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
                        <FiEye className="mr-1.5 text-[#3a9ec9]" /> {dataset.views.toLocaleString()} kali dilihat
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiDownload className="mr-1.5 text-[#3a9ec9]" /> {dataset.downloads.toLocaleString()} kali diunduh
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Terakhir diperbarui: {dataset.date}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Tingkat popularitas dataset</span>
                    <span>{Math.round(dataset.views / 30)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] h-2 rounded-full" 
                      style={{ width: `${Math.min(100, dataset.views / 30)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
        </div>
      </div>
    </Layout>
  );
};

export default OrganisasiDetailPage;