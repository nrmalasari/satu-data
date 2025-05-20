import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiSearch, FiArrowRight, FiDatabase, FiClock } from 'react-icons/fi';
import { getOrganizations, getSectors } from '../services/api';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const OrganisasiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [orgsData, sectorsData] = await Promise.all([
        getOrganizations(),
        getSectors(),
      ]);
      console.log('Organizations Data:', orgsData);
      console.log('Sectors Data:', sectorsData);
      setOrganizations(Array.isArray(orgsData.data) ? orgsData.data : orgsData);
      setSectors(Array.isArray(sectorsData) ? sectorsData : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      const errorMessage = err.response?.status
        ? `Request failed with status code ${err.response.status}: ${err.response.data?.message || 'Internal server error'}`
        : 'Failed to connect to the server';
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetry = () => {
    setTimeout(fetchData, 1000); // Delay retry by 1 second
  };

  const formatDate = (org) => {
    const formatted = org.last_updated_formatted;
    console.log('Formatting date for organization:', {
      id: org.id,
      last_updated: org.last_updated,
      last_updated_formatted: formatted,
    });
    
    // Return formatted if it looks like a valid date (e.g., "18 Mei 2025")
    if (formatted && !formatted.includes('Belum') && formatted.match(/^\d{1,2} \w+ \d{4}$/)) {
      return formatted;
    }

    // Fallback to parsing last_updated
    if (org.last_updated) {
      try {
        const date = parseISO(org.last_updated);
        return format(date, 'd MMMM yyyy', { locale: id });
      } catch (e) {
        console.warn('Invalid last_updated format:', org.last_updated);
      }
    }

    return 'Belum pernah diperbarui';
  };

  const filteredOrgs = organizations.filter((org) => {
    const sectorName = org.sector?.name || '';
    return (
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sectorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">Organisasi</h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Daftar organisasi pemerintah yang berkontribusi dalam penyediaan data terbuka
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
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

          <div className="w-full">
            {filteredOrgs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrgs.map((org) => (
                  <div
                    key={org.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#3a9ec9]/20 group"
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start mb-5">
                        <div className="w-16 h-16 rounded-xl bg-[#e1f5fe] flex items-center justify-center mr-4 flex-shrink-0">
                          <img
                            src={org.logo_url}
                            alt={org.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              e.target.src = '/images/default-organization.png';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#02033b] group-hover:text-[#3a9ec9] mb-2">
                            {org.name}
                          </h3>
                          <span className="text-xs text-white bg-[#3a9ec9] px-2 py-1 rounded-full mt-1 inline-block">
                            {org.sector?.name || 'Tidak ada sektor'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {org.description || 'Tidak ada deskripsi'}
                      </p>
                      <div className="flex justify-between items-center text-gray-600 mt-6 pt-5 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <FiDatabase className="text-[#3a9ec9] text-lg" />
                          <span className="text-sm">
                            {org.dataset_count >= 0
                              ? `${org.dataset_count} Dataset${org.dataset_count !== 1 ? 's' : ''}`
                              : 'Belum ada dataset'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FiClock className="text-[#3a9ec9] text-lg" />
                          <span className="text-sm">{formatDate(org)}</span>
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
                  onClick={() => setSearchTerm('')}
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