import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiSearch, FiArrowRight, FiDatabase, FiClock } from 'react-icons/fi';

// Data yang digunakan oleh kedua komponen
export const organizations = [
  {
    id: 1,
    name: "Dinas Komunikasi dan Informatika",
    logo: "/icons/kominfo-icon.svg",
    datasets: 42,
    updated: "2 hari lalu",
    sector: "TELEKOMUNIKASI",
    description: "Mengelola sistem informasi dan komunikasi pemerintahan kota Parepare",
    contact: "0411-1234567",
    website: "kominfo.parepare.go.id",
    address: "Jl. Informatika No. 1, Parepare"
  },
  {
    id: 2,
    name: "Dinas Kesehatan",
    logo: "/icons/health-icon.svg",
    datasets: 28,
    updated: "3 hari lalu",
    sector: "KESEHATAN",
    description: "Mengelola layanan kesehatan dan fasilitas kesehatan masyarakat",
    contact: "0411-3456789",
    website: "dinkes.parepare.go.id",
    address: "Jl. Kesehatan No. 2, Parepare"
  },
  {
      id: 3,
      name: "Dinas Ketenaga Kerjaan",
      logo: "/icons/health-icon.svg",
      datasets: 28,
      updated: "3 hari lalu",
      sector: "KEPENDUDUKAN",
      description: "Mengelola layanan Ketenaga Kerjaan masyarakat Parepare",
      contact: "0411-3456789",
      website: "dinkes.parepare.go.id"
    },
    {
      id: 4,
      name: "Badan Perencanaan Pembangunan Daerah",
      logo: "/icons/planning-icon.svg",
      datasets: 51,
      updated: "1 hari lalu",
      sector: "PEMERINTAHAN",
      description: "Merencanakan dan mengkoordinasikan pembangunan daerah",
      contact: "0411-4567890",
      website: "bappeda.parepare.go.id"
    },
    {
      id: 5,
      name: "Dinas Sosial",
      logo: "/icons/social-icon.svg",
      datasets: 23,
      updated: "1 minggu lalu",
      sector: "SOSIAL",
      description: "Menangani masalah kesejahteraan sosial masyarakat",
      contact: "0411-5678901",
      website: "dinsos.parepare.go.id"
    },
    {
      id: 6,
      name: "Dinas Perdagangan",
      logo: "/icons/trade-icon.svg",
      datasets: 65,
      updated: "Baru saja",
      sector: "PERDAGANGAN",
      description: "Mengatur dan mengembangkan perdagangan di wilayah kota",
      contact: "0411-6789012",
      website: "disdag.parepare.go.id"
    }
];

const OrganisasiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrgs = organizations.filter(org => {
    return org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           org.sector.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-40 pb-18 text-center text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">Organisasi</h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Daftar organisasi pemerintah Kota Parepare yang berkontribusi dalam penyediaan data terbuka
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          {/* Search */}
          <div className="max-w-5xl mx-auto px-4 -mt-28 mb-8 relative z-10">
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow group">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Cari organisasi atau sektor..."
                className="w-full h-14 pl-12 pr-32 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9ec9] text-gray-700 placeholder-gray-400 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Organization Grid */}
          <div className="w-full">
            {filteredOrgs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrgs.map((org) => (
                  <div key={org.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#3a9ec9]/20 group">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start mb-5">
                        <div className="w-16 h-16 rounded-xl bg-[#e1f5fe] flex items-center justify-center mr-4 flex-shrink-0">
                          <img src={org.logo} alt={org.name} className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#02033b] group-hover:text-[#3a9ec9] mb-2">{org.name}</h3>
                          <span className="text-xs text-white bg-[#3a9ec9] px-2 py-1 rounded-full mt-1 inline-block">
                            {org.sector}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{org.description}</p>
                      <div className="flex justify-between text-gray-600 mt-6 pt-5 border-t border-gray-200">
                        <div className="flex items-center">
                          <FiDatabase className="mr-2 text-[#3a9ec9]" />
                          <span className="text-sm">{org.datasets} Dataset</span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="mr-2 text-[#3a9ec9]" />
                          <span className="text-sm">Diperbarui {org.updated}</span>
                        </div>
                      </div>
                      <Link 
                        to={`/organisasiDetails/${org.id}`}
                        className="mt-4 px-4 py-2.5 bg-gray-50 hover:bg-[#f0f9ff] text-[#3a9ec9] rounded-lg text-sm font-medium transition-colors flex items-center justify-center border border-gray-200 group-hover:border-[#3a9ec9]/30"
                      >
                        Lihat detail organisasi
                        <FiArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10 text-center">
                <div className="mx-auto w-16 h-16 bg-[#e1f5fe] rounded-full flex items-center justify-center text-[#3a9ec9] mb-5">
                  <FiSearch className="text-2xl" />
                </div>
                <h3 className="text-xl font-medium text-[#02033b] mb-2">
                  Tidak ada organisasi ditemukan
                </h3>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] hover:from-[#3a9ec9] hover:to-[#2a8bb7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganisasiPage;