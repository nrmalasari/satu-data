import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiDownload, FiEye, FiClock, FiFile, FiTable } from 'react-icons/fi';
import { getDatasetById, getFilePreviewUrl, getFileDownloadUrl, incrementDownloadCount } from '../services/api';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('preview');
  const [csvData, setCsvData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        setIsLoading(true);
        console.log(`Fetching dataset ID: ${id}`);
        const response = await getDatasetById(id);

        if (!response?.id) {
          throw new Error('Dataset tidak ditemukan atau response tidak valid');
        }

        if (!response.file_path) {
          throw new Error('File dataset tidak tersedia');
        }

        const datasetData = {
          id: response.id,
          judul: response.title || 'Judul tidak tersedia',
          deskripsi: response.description || 'Tidak ada deskripsi tersedia',
          path_file: getFilePreviewUrl(response.id),
          download_url: getFileDownloadUrl(response.id),
          nama_file: response.file_name || 'file',
          tipe_file: response.file_type || 'Tidak diketahui',
          ukuran_file: response.file_size || 'Ukuran tidak diketahui',
          organisasi: response.organization?.name || `ID: ${response.organization_id || 'Tidak diketahui'}`,
          sektor: response.sector?.name || `ID: ${response.sector_id || 'Tidak diketahui'}`,
          tanggal_publikasi: response.published_date
            ? new Date(response.published_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Tanggal tidak diketahui',
          terakhir_diperbarui: response.updated_at
            ? new Date(response.updated_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Tanggal tidak diketahui',
          jumlah_dilihat: response.views ?? 0,
          jumlah_diunduh: response.downloads ?? 0,
          tahun: response.year || 'Tahun tidak diketahui',
          tags: Array.isArray(response.tags) ? response.tags : [],
          featured: response.is_featured || false,
        };

        setDataset(datasetData);

        try {
          const fileCheck = await fetch(datasetData.path_file, { method: 'HEAD' });
          if (!fileCheck.ok) {
            throw new Error('File tidak dapat diakses');
          }

          const fileType = response.file_type.toLowerCase();
          if (fileType.includes('csv')) {
            await fetchCsvData(datasetData.path_file);
          } else if (fileType.includes('excel') || fileType.includes('xls') || fileType.includes('ods')) {
            await fetchExcelData(datasetData.path_file);
          }
        } catch (fileError) {
          console.error('File access error:', fileError);
          setError('File dataset tidak dapat diakses untuk pratinjau');
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error in fetchDataset:', err);
        setError(err.message || 'Gagal memuat dataset');
        setIsLoading(false);
      }
    };

    const fetchCsvData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal mengambil file CSV: ${response.status}`);
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setCsvData(results.data.slice(0, 100));
          },
        });
      } catch (err) {
        console.error('Error parsing CSV:', err);
      }
    };

    const fetchExcelData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal mengambil file Excel: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData.slice(0, 100));
      } catch (err) {
        console.error('Error parsing Excel:', err);
      }
    };

    fetchDataset();
  }, [id]);

  const handleDownload = async () => {
    if (!dataset?.download_url) {
      setError('File tidak tersedia untuk diunduh');
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch(dataset.download_url, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error(`File tidak dapat diakses: ${response.status}`);
      }

      // Panggil incrementDownloadCount sebelum download
      try {
        await incrementDownloadCount(dataset.id);
        setDataset((prev) => ({
          ...prev,
          jumlah_diunduh: (prev.jumlah_diunduh || 0) + 1,
        }));
      } catch (err) {
        console.error('Gagal menambah jumlah unduhan:', err);
      }

      const link = document.createElement('a');
      link.href = dataset.download_url;
      link.download = dataset.nama_file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
      setError(`Gagal mengunduh file: ${err.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderFilePreview = () => {
    if (!dataset?.path_file) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <p className="text-gray-600">File tidak tersedia untuk pratinjau.</p>
        </div>
      );
    }

    const fileType = dataset.tipe_file.toLowerCase();

    if (fileType.includes('pdf')) {
      return (
        <div className="w-full h-full">
          <object
            data={dataset.path_file}
            type="application/pdf"
            width="100%"
            height="100%"
            className="border-0"
            title="Pratinjau PDF"
          >
            <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
              <FiFile className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4 text-center">
                Pratinjau PDF tidak didukung oleh browser ini. Silakan unduh file untuk melihat isinya.
              </p>
              <button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
                disabled={isDownloading}
              >
                <FiDownload className="mr-2" />
                {isDownloading ? 'Mengunduh...' : 'Unduh PDF'}
              </button>
            </div>
          </object>
        </div>
      );
    } else if (fileType.includes('csv')) {
      if (csvData) {
        return (
          <div className="overflow-auto h-full p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {csvData[0] &&
                    Object.keys(csvData[0]).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {csvData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td
                        key={j}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-sm text-gray-500">
              Menampilkan {csvData.length} baris pertama
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <FiTable className="w-12 h-12 text-blue-500 mb-4" />
            <p className="text-gray-600 mb-4">Memuat data CSV...</p>
          </div>
        );
      }
    } else if (fileType.includes('excel') || fileType.includes('xls') || fileType.includes('ods')) {
      if (excelData) {
        return (
          <div className="overflow-auto h-full p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {excelData[0] &&
                    Object.keys(excelData[0]).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {excelData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td
                        key={j}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-sm text-gray-500">
              Menampilkan {excelData.length} baris pertama
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <FiTable className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-gray-600 mb-4">Memuat data spreadsheet...</p>
          </div>
        );
      }
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
          <FiFile className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{dataset.nama_file}</h3>
          <p className="text-gray-600 mb-4 text-center">
            Pratinjau tidak tersedia untuk file {dataset.tipe_file}.<br />
            Silakan unduh file untuk melihat isinya.
          </p>
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center mx-auto"
            disabled={isDownloading}
          >
            <FiDownload className="mr-2" />
            {isDownloading ? 'Mengunduh...' : 'Unduh File'}
          </button>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3a9ec9] mb-4"></div>
            <p className="text-lg text-gray-700">Memuat dataset...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !dataset) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] flex items-center justify-center">
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700">{error || 'Dataset tidak ditemukan'}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-[#3a9ec9] text-white rounded hover:bg-[#2a8bb7] transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-28 pb-12 text-white relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                    {dataset.sektor}
                  </span>
                  {dataset.featured && (
                    <span className="inline-block bg-yellow-400/30 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      Unggulan
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{dataset.judul}</h1>
                <p className="text-white/90 max-w-3xl">{dataset.deskripsi}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {dataset.tipe_file.toLowerCase().includes('pdf') && (
                  <button
                    onClick={() => setViewMode(viewMode === 'preview' ? 'full' : 'preview')}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <FiEye className="mr-2" />
                    {viewMode === 'preview' ? 'Tampilan Penuh' : 'Tampilan Pratinjau'}
                  </button>
                )}
                <button
                  onClick={handleDownload}
                  className="bg-white text-[#3a9ec9] hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center justify-center font-medium transition-colors"
                  disabled={isDownloading}
                >
                  <FiDownload className="mr-2" />
                  {isDownloading ? 'Mengunduh...' : 'Unduh'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <FiFile className="text-[#3a9ec9] mr-2" />
                    <span className="font-medium">
                      {dataset.tipe_file} • {dataset.ukuran_file}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    Diperbarui {dataset.terakhir_diperbarui}
                  </div>
                </div>
                <div className="w-full h-[600px]">
                  {renderFilePreview()}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#e18335] to-[#f6c041] rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Statistik Dataset</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50/30 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">Dilihat</span>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FiEye className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {dataset.jumlah_dilihat.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Total kunjungan</div>
                  </div>
                  <div className="bg-green-50/30 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Diunduh</span>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiDownload className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {dataset.jumlah_diunduh.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Total unduhan</div>
                  </div>
                  <div className="bg-purple-50/30 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800">Publikasi</span>
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FiClock className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {dataset.tanggal_publikasi.split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Tanggal rilis</div>
                  </div>
                  <div className="bg-amber-50/30 p-4 rounded-lg border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-800">Sumber</span>
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <FiFile className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-800 line-clamp-1">
                      {dataset.organisasi}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Organisasi</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#02033b] mb-4">Informasi Dataset</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Jenis File</h4>
                    <p className="font-medium">{dataset.tipe_file}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Ukuran File</h4>
                    <p className="font-medium">{dataset.ukuran_file}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Organisasi</h4>
                    <p className="font-medium">{dataset.organisasi}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Sektor</h4>
                    <p className="font-medium">{dataset.sektor}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tanggal Publikasi</h4>
                    <p className="font-medium">{dataset.tanggal_publikasi}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Terakhir Diperbarui</h4>
                    <p className="font-medium">{dataset.terakhir_diperbarui}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tahun</h4>
                    <p className="font-medium">{dataset.tahun}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <p className="font-medium">{dataset.featured ? 'Unggulan' : 'Standar'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#02033b] mb-4">Tag</h3>
                <div className="flex flex-wrap gap-2">
                  {dataset.tags.length > 0 ? (
                    dataset.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-[#3a9ec9] px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">Tidak ada tag tersedia.</p>
                  )}
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