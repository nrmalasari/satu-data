import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiDownload, FiArrowLeft, FiEye, FiClock, FiFile } from 'react-icons/fi';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('preview');

  useEffect(() => {
    const dummyData = {
      id: id,
      title: "DAFTAR SARANA USAHA PARIWISATA KOTA PAREPARE 2024",
      description: "Dokumen ini berisi daftar lengkap sarana usaha pariwisata yang terdaftar di Kota Parepare tahun 2024.",
      fileUrl: "/documents/DAFTAR-SARANA-USAHA-PARIWISATA-TAHUN-2024.pdf",
      fileType: "PDF",
      fileSize: "1.8 MB",
      source: "Dinas Pariwisata Kota Parepare",
      publishedDate: "15 Januari 2024",
      lastUpdated: "1 minggu lalu",
      views: 1250,
      downloads: 680,
      sector: "PARIWISATA",
      tags: ["pariwisata", "usaha", "daftar resmi"],
      relatedDocuments: [
        { id: 101, title: "Statistik Kunjungan Wisata 2023", type: "PDF" },
        { id: 102, title: "Panduan Standar Usaha Pariwisata", type: "PDF" }
      ]
    };
    setDocumentData(dummyData);
  }, [id]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentData.fileUrl;
    link.download = documentData.title.replace(/\s+/g, '_') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!documentData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3a9ec9] mb-4"></div>
            <p className="text-lg text-gray-700">Memuat dokumen...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center bg-white text-[#3a9ec9] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors shadow-lg"
        >
          <FiArrowLeft className="mr-2" /> Kembali
        </button>
      </div>

      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-28 pb-12 text-white relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="mb-6 md:mb-0">
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-3">
                  {documentData.sector}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{documentData.title}</h1>
                <p className="text-white/90 max-w-3xl">{documentData.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setViewMode(viewMode === 'preview' ? 'full' : 'preview')}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FiEye className="mr-2" />
                  {viewMode === 'preview' ? 'Tampilan Penuh' : 'Tampilan Pratinjau'}
                </button>
                <button 
                  onClick={handleDownload}
                  className="bg-white text-[#3a9ec9] hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Unduh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Document Viewer */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <FiFile className="text-[#3a9ec9] mr-2" />
                    <span className="font-medium">
                      {documentData.fileType} • {documentData.fileSize}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    Diperbarui {documentData.lastUpdated}
                  </div>
                </div>
                
                {/* PDF Viewer */}
                <div className="w-full h-[600px]">
                  {viewMode === 'preview' ? (
                    <iframe 
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + documentData.fileUrl)}&embedded=true`}
                      className="w-full h-full border-0"
                      title="Document Preview"
                    ></iframe>
                  ) : (
                    <iframe 
                      src={documentData.fileUrl}
                      className="w-full h-full border-0"
                      title="Document Full"
                    ></iframe>
                  )}
                </div>
              </div>
              
              {/* Document Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Statistik Dokumen</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Views */}
                  <div className="bg-blue-50/30 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">Dilihat</span>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{documentData.views.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Total kunjungan</div>
                  </div>

                  {/* Downloads */}
                  <div className="bg-green-50/30 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Diunduh</span>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{documentData.downloads.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Total unduhan</div>
                  </div>

                  {/* Published Date */}
                  <div className="bg-purple-50/30 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800">Publikasi</span>
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {documentData.publishedDate.split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Tanggal rilis</div>
                  </div>

                  {/* Source */}
                  <div className="bg-amber-50/30 p-4 rounded-lg border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-800">Sumber</span>
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-800 line-clamp-1">
                      {documentData.source.split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Organisasi</div>
                  </div>
                </div>
              </div>

              {/* Related Documents */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-lg font-bold text-[#02033b] mb-4">Dokumen Terkait</h3>
                <div className="space-y-4">
                  {documentData.relatedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <FiFile className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Document Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#02033b] mb-4">Informasi Dokumen</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Jenis Dokumen</h4>
                    <p className="font-medium">{documentData.fileType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Ukuran File</h4>
                    <p className="font-medium">{documentData.fileSize}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Organisasi</h4>
                    <p className="font-medium">{documentData.source}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Sektor</h4>
                    <p className="font-medium">{documentData.sector}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tanggal Publikasi</h4>
                    <p className="font-medium">{documentData.publishedDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Terakhir Diperbarui</h4>
                    <p className="font-medium">{documentData.lastUpdated}</p>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#02033b] mb-4">Tag</h3>
                <div className="flex flex-wrap gap-2">
                  {documentData.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-50 text-[#3a9ec9] px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;