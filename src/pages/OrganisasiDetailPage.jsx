import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiArrowLeft, FiDatabase, FiSearch } from 'react-icons/fi';
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

  // Sample datasets based on your image
  const datasets = [
    {
      id: 1,
      title: "Persentase Kopesertaan Jaminan Kesehatan Nasional (JKN)",
      value: "0.00%",
      description: "Sasaran: % Cakupan Jaminan Kesehatan dilaksanakan melalui skema Jaminan Kesehatan Nasional (JKN). JKN adalah program Pemerintah yang bertujuan memberikan kepastian jaminan kesehatan yang menyeluruh bagi seluruh rakyat Indonesia."
    },
    {
      id: 2,
      title: "Data Cakupan Neonatus dengan Komplikasi yang Ditangani",
      value: "0.00%",
      description: "Data cakupan neonatal dengan komplikasi di suatu wilayah kerja pada kurun waktu tertentu yang ditangani sesuai dengan standar oleh tenaga kesehatan terlatih di seluruh fasilitas pelayanan kesehatan."
    },
    {
      id: 3,
      title: "Data Permasalahan Kesehatan yang Diintervensi oleh Tim Ketuk Pintu Layani dengan Hati (KPLDH)",
      value: "0.00%",
      description: "Data Permasalahan Kesehatan yang Diintervensi oleh Tim Ketuk Pintu Layani dengan Hati (KPLDH) berupa pelayanan kesehatan gratis yang melaksanakan tindak preventif, promosi, kuratif, hingga rehabilitatif."
    },
    {
      id: 4,
      title: "Persentase Tempat Pengelolaan Pangan (TPP) yang Memenuhi Syarat Sesuai Standar",
      value: "0.00%",
      description: "Persentase Tempat Pengelolaan Pangan (TPP) yang Memenuhi Syarat Sesuai Standar. Tempat Pengelolaan Pangan dalam sup saji yang selanjutnya disebut TPP adalah fasilitas produksi untuk menyiapkan, mengolah pangan."
    },
    {
      id: 5,
      title: "Persentase Penduduk Penderita Diabetes Mellitus yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
      value: "0.00%",
      description: "Sasaran: % Penderita DM yang mendapatkan pelayanan kesehatan sesuai standar. Pelayanan kesehatan sesuai standar kepada seluruh penderita Diabetes Mellitus (DM) usia 15 tahun ke atas."
    }
  ];

  return (
    <Layout>
      <div className="from-[#e8f1ff] to-[#d6e6ff]  min-h-screen">
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
                </div>
              </div>

              {/* Back Button - Updated to be more beautiful and moved to right */}
              <Link 
                to="/organisasi" 
                className="flex items-center bg-[#f6c041] hover:bg-[#e18335] text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg ml-auto"
              >
                <FiArrowLeft className="mr-2" />
                Kembali
              </Link>
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

          {/* Dataset List */}
          <div className="space-y-5">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#02033b] mb-2">
                        {dataset.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {dataset.description}
                      </p>
                    </div>
                    <span className="bg-[#e1f5fe] text-[#3a9ec9] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                      {dataset.value}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-[#3a9ec9] hover:text-[#2a8bb7] text-sm font-medium flex items-center">
                      Lihat detail dataset
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganisasiDetailPage;