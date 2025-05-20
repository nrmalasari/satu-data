import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getInfografisById } from '../services/api';
import { FiArrowLeft, FiEye, FiDownload } from 'react-icons/fi';

const InfografisDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [infografis, setInfografis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfografisById(id);
        setInfografis(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Gagal memuat data infografis');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDownload = () => {
    if (infografis?.image_url) {
      const link = document.createElement('a');
      link.href = infografis.image_url;
      link.download = `infografis-${infografis.title.replace(/\s+/g, '-').toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/infografis')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Kembali ke Daftar Infografis
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!infografis) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-yellow-600 mb-4">Infografis Tidak Ditemukan</h2>
            <button
              onClick={() => navigate('/infografis')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Kembali ke Daftar Infografis
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Blurred Background */}
      <div className="min-h-screen bg-gray-100 bg-cover bg-center relative overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200/70 to-gray-300/70 backdrop-blur-md"
          style={{
            backgroundImage: `url(${infografis.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) brightness(0.8)',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-gray-200 transition-colors bg-black/50 px-4 py-2 rounded-lg"
            >
              <FiArrowLeft className="mr-2" />
              Kembali
            </button>
          </div>

          {/* Infografis Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] py-6 px-8 text-white">
              <h1 className="text-3xl font-bold leading-tight">{infografis.title}</h1>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4">
                <span className="inline-block bg-white text-[#3a9ec9] px-4 py-1 rounded-full text-sm font-medium">
                  {infografis.sector?.name || 'Umum'}
                </span>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-sm">
                    <FiEye className="mr-2" />
                    {infografis.views?.toLocaleString() || '0'} views
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="flex items-center text-sm bg-white text-[#3a9ec9] px-4 py-1 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <FiDownload className="mr-2" />
                    Unduh
                  </button>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="p-8 flex justify-center bg-gray-50">
              <div className="relative w-full max-w-4xl">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
                <img 
                  src={`${infografis.image_url}?t=${new Date().getTime()}`} 
                  alt={infografis.title}
                  className={`w-full max-h-[80vh] object-contain rounded-lg shadow-md transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setImageLoading(false)}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${infografis.image_url}`);
                    e.target.src = '/images/default-infografis.jpg';
                    setImageLoading(false);
                  }}
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600">
                Dipublikasikan pada: {new Date(infografis.published_date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InfografisDetailPage;