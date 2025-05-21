import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiArrowLeft } from 'react-icons/fi';
import { Database, Eye } from 'lucide-react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getOrganizationById, getTableById } from '../services/api';

// Dummy organizations data (tidak diubah, hanya untuk referensi)
const organizations = [
  {
    id: 1,
    industrialData: {
      totalRegistered: 1500,
      permitsThisMonth: 250,
      districts: [
        { name: 'Kota A', count: 400 },
        { name: 'Kota B', count: 350 },
        { name: 'Kota C', count: 300 },
        { name: 'Kota D', count: 450 }
      ]
    },
    measurementData: [
      { name: 'Sistem Jaringan', value: 40 },
      { name: 'Keamanan Data', value: 30 },
      { name: 'Infrastruktur', value: 30 }
    ],
    developmentChartData: [
      { name: 'Jan', dataset1: 5, dataset2: 7 },
      { name: 'Feb', dataset1: 6, dataset2: 8 },
      { name: 'Mar', dataset1: 8, dataset2: 6 },
      { name: 'Apr', dataset1: 10, dataset2: 5 },
      { name: 'Mei', dataset1: 12, dataset2: 7 },
      { name: 'Jun', dataset1: 11, dataset2: 9 },
      { name: 'Jul', dataset1: 9, dataset2: 10 },
      { name: 'Agu', dataset1: 7, dataset2: 8 },
      { name: 'Sep', dataset1: 9, dataset2: 6 },
      { name: 'Okt', dataset1: 10, dataset2: 7 },
      { name: 'Nov', dataset1: 8, dataset2: 9 },
      { name: 'Des', dataset1: 6, dataset2: 10 }
    ],
    marketPrices: [
      { name: 'Laptop', price: '15.000.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Router', price: '2.500.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Server', price: '50.000.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Kabel Fiber', price: '500.000', unit: 'Meter', lastUpdate: '30 April 2025' },
      { name: 'Switch', price: '3.000.000', unit: 'Unit', lastUpdate: '30 April 2025' }
    ],
    foodProducts: [
      { name: 'Laptop', image: '/api/placeholder/60/60', altText: 'Ikon Laptop' },
      { name: 'Router', image: '/api/placeholder/60/60', altText: 'Ikon Router' },
      { name: 'Server', image: '/api/placeholder/60/60', altText: 'Ikon Server' },
      { name: 'Kabel Fiber', image: '/api/placeholder/60/60', altText: 'Ikon Kabel Fiber' },
      { name: 'Switch', image: '/api/placeholder/60/60', altText: 'Ikon Switch' },
      { name: 'Monitor', image: '/api/placeholder/60/60', altText: 'Ikon Monitor' },
      { name: 'Keyboard', image: '/api/placeholder/60/60', altText: 'Ikon Keyboard' },
      { name: 'Mouse', image: '/api/placeholder/60/60', altText: 'Ikon Mouse' },
      { name: 'Printer', image: '/api/placeholder/60/60', altText: 'Ikon Printer' },
      { name: 'Proyektor', image: '/api/placeholder/60/60', altText: 'Ikon Proyektor' }
    ],
    cardTitles: {
      card1: "Jaringan Terdaftar",
      card2: "Lisensi Jaringan",
      card3: "Distribusi Jaringan",
      card4: "Grafik Perkembangan Jaringan",
      card5: "Jumlah Perangkat Valid",
      card6: "Frekuensi Pengujian Perangkat",
      card7: "Index Harga Perangkat",
      card8: "Update Harga Perangkat Terkini"
    }
  },
  {
    id: 2,
    industrialData: {
      totalRegistered: 1204,
      permitsThisMonth: 210,
      districts: [] // Akan diisi dari API untuk id=5
    },
    measurementData: [], // Akan diisi dari API
    developmentChartData: [
      { name: 'Jan', dataset1: 3, dataset2: 5 },
      { name: 'Feb', dataset1: 4, dataset2: 6 },
      { name: 'Mar', dataset1: 6, dataset2: 4 },
      { name: 'Apr', dataset1: 8, dataset2: 3 },
      { name: 'Mei', dataset1: 10, dataset2: 5 },
      { name: 'Jun', dataset1: 9, dataset2: 7 },
      { name: 'Jul', dataset1: 7, dataset2: 8 },
      { name: 'Agu', dataset1: 5, dataset2: 6 },
      { name: 'Sep', dataset1: 7, dataset2: 4 },
      { name: 'Okt', dataset1: 8, dataset2: 5 },
      { name: 'Nov', dataset1: 6, dataset2: 7 },
      { name: 'Des', dataset1: 4, dataset2: 8 }
    ],
    marketPrices: [
      { name: 'Beras Medium', price: '11.000', unit: 'Kg', lastUpdate: '30 April 2025' },
      { name: 'Cabe', price: '25.000', unit: 'Kg', lastUpdate: '30 April 2025' },
      { name: 'Ayam', price: '35.000', unit: 'Kg', lastUpdate: '30 April 2025' },
      { name: 'Daging', price: '90.000', unit: 'Kg', lastUpdate: '30 April 2025' },
      { name: 'Ikan', price: '30.000', unit: 'Kg', lastUpdate: '30 April 2025' }
    ],
    foodProducts: [
      { name: 'Beras', image: '/images/beras.png', altText: 'Ikon Beras' },
      { name: 'Cabe', image: '/images/cabai.png', altText: 'Ikon Cabe' },
      { name: 'Ayam', image: '/images/ayam.png', altText: 'Ikon Ayam' },
      { name: 'Daging', image: '/images/daging.png', altText: 'Ikon Daging' },
      { name: 'Ikan', image: '/images/ikan.png', altText: 'Ikon Ikan' },
      { name: 'Bawang', image: '/images/Bmerah.png', altText: 'Ikon Bawang' },
      { name: 'Telur', image: '/images/telur.png', altText: 'Ikon Telur' },
      { name: 'Tahu', image: '/images/tahu.png', altText: 'Ikon Tahu' },
      { name: 'Tempe', image: '/images/tempe.png', altText: 'Ikon Tempe' },
      { name: 'Tomat', image: '/images/tomat.png', altText: 'Ikon Tomat' }
    ],
    cardTitles: {
      card1: "Pedagang Terdaftar",
      card2: "Izin Usaha",
      card3: "", // Akan diisi dari API description
      card4: "Grafik Perkembangan Pasar",
      card5: "Jumlah Alat Ukur Dagang Valid",
      card6: "", // Akan diisi dari API description
      card7: "Index Harga Pasar",
      card8: "Update Harga Pasar Terkini"
    }
  },
  {
    id: 3,
    industrialData: {
      totalRegistered: 900,
      permitsThisMonth: 180,
      districts: [
        { name: 'Wilayah A', count: 250 },
        { name: 'Wilayah B', count: 200 },
        { name: 'Wilayah C', count: 250 },
        { name: 'Wilayah D', count: 200 }
      ]
    },
    measurementData: [
      { name: 'Pendaftaran', value: 50 },
      { name: 'Pelatihan', value: 30 },
      { name: 'Pengawasan', value: 20 }
    ],
    developmentChartData: [
      { name: 'Jan', dataset1: 4, dataset2: 6 },
      { name: 'Feb', dataset1: 5, dataset2: 7 },
      { name: 'Mar', dataset1: 7, dataset2: 5 },
      { name: 'Apr', dataset1: 9, dataset2: 4 },
      { name: 'Mei', dataset1: 11, dataset2: 6 },
      { name: 'Jun', dataset1: 10, dataset2: 8 },
      { name: 'Jul', dataset1: 8, dataset2: 9 },
      { name: 'Agu', dataset1: 6, dataset2: 7 },
      { name: 'Sep', dataset1: 8, dataset2: 5 },
      { name: 'Okt', dataset1: 9, dataset2: 6 },
      { name: 'Nov', dataset1: 7, dataset2: 8 },
      { name: 'Des', dataset1: 5, dataset2: 9 }
    ],
    marketPrices: [
      { name: 'Sertifikasi', price: '500.000', unit: 'Dokumen', lastUpdate: '30 April 2025' },
      { name: 'Pelatihan', price: '2.000.000', unit: 'Kelas', lastUpdate: '30 April 2025' },
      { name: 'Buku Panduan', price: '150.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Alat Pelatihan', price: '1.000.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Konsultan', price: '5.000.000', unit: 'Paket', lastUpdate: '30 April 2025' }
    ],
    foodProducts: [
      { name: 'Sertifikasi', image: '/api/placeholder/60/60', altText: 'Ikon Sertifikasi' },
      { name: 'Pelatihan', image: '/api/placeholder/60/60', altText: 'Ikon Pelatihan' },
      { name: 'Buku Panduan', image: '/api/placeholder/60/60', altText: 'Ikon Buku Panduan' },
      { name: 'Alat Pelatihan', image: '/api/placeholder/60/60', altText: 'Ikon Alat Pelatihan' },
      { name: 'Konsultan', image: '/api/placeholder/60/60', altText: 'Ikon Konsultan' },
      { name: 'Formulir', image: '/api/placeholder/60/60', altText: 'Ikon Formulir' },
      { name: 'Poster', image: '/api/placeholder/60/60', altText: 'Ikon Poster' },
      { name: 'Brosur', image: '/api/placeholder/60/60', altText: 'Ikon Brosur' },
      { name: 'Laptop', image: '/api/placeholder/60/60', altText: 'Ikon Laptop' },
      { name: 'Proyektor', image: '/api/placeholder/60/60', altText: 'Ikon Proyektor' }
    ],
    cardTitles: {
      card1: "Pekerja Terdaftar",
      card2: "Izin Kerja",
      card3: "Distribusi Pekerja",
      card4: "Grafik Perkembangan Tenaga Kerja",
      card5: "Jumlah Alat Pelatihan Valid",
      card6: "Frekuensi Pengujian Pelatihan",
      card7: "Index Harga Pelatihan",
      card8: "Update Harga Pelatihan Terkini"
    }
  },
  {
    id: 4,
    industrialData: {
      totalRegistered: 2000,
      permitsThisMonth: 400,
      districts: [
        { name: 'Zona A', count: 600 },
        { name: 'Zona B', count: 500 },
        { name: 'Zona C', count: 450 },
        { name: 'Zona D', count: 450 }
      ]
    },
    measurementData: [
      { name: 'Konsultasi KB', value: 45 },
      { name: 'Pemeriksaan', value: 25 },
      { name: 'Edukasi', value: 30 }
    ],
    developmentChartData: [
      { name: 'Jan', dataset1: 6, dataset2: 8 },
      { name: 'Feb', dataset1: 7, dataset2: 9 },
      { name: 'Mar', dataset1: 9, dataset2: 7 },
      { name: 'Apr', dataset1: 11, dataset2: 6 },
      { name: 'Mei', dataset1: 13, dataset2: 8 },
      { name: 'Jun', dataset1: 12, dataset2: 10 },
      { name: 'Jul', dataset1: 10, dataset2: 11 },
      { name: 'Agu', dataset1: 8, dataset2: 9 },
      { name: 'Sep', dataset1: 10, dataset2: 7 },
      { name: 'Okt', dataset1: 11, dataset2: 8 },
      { name: 'Nov', dataset1: 9, dataset2: 10 },
      { name: 'Des', dataset1: 7, dataset2: 11 }
    ],
    marketPrices: [
      { name: 'Alat KB', price: '300.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Buku Edukasi', price: '100.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Poster KB', price: '50.000', unit: 'Lembar', lastUpdate: '30 April 2025' },
      { name: 'Konseling', price: '200.000', unit: 'Sesi', lastUpdate: '30 April 2025' },
      { name: 'Obat', price: '150.000', unit: 'Paket', lastUpdate: '30 April 2025' }
    ],
    foodProducts: [
      { name: 'Alat KB', image: '/api/placeholder/60/60', altText: 'Ikon Alat KB' },
      { name: 'Buku Edukasi', image: '/api/placeholder/60/60', altText: 'Ikon Buku Edukasi' },
      { name: 'Poster KB', image: '/api/placeholder/60/60', altText: 'Ikon Poster KB' },
      { name: 'Konseling', image: '/api/placeholder/60/60', altText: 'Ikon Konseling' },
      { name: 'Obat', image: '/api/placeholder/60/60', altText: 'Ikon Obat' },
      { name: 'Brosur', image: '/api/placeholder/60/60', altText: 'Ikon Brosur' },
      { name: 'Leaflet', image: '/api/placeholder/60/60', altText: 'Ikon Leaflet' },
      { name: 'Kalender', image: '/api/placeholder/60/60', altText: 'Ikon Kalender' },
      { name: 'Stiker', image: '/api/placeholder/60/60', altText: 'Ikon Stiker' },
      { name: 'Spanduk', image: '/api/placeholder/60/60', altText: 'Ikon Spanduk' }
    ],
    cardTitles: {
      card1: "Penduduk Terdaftar",
      card2: "Izin Keluarga",
      card3: "Distribusi Penduduk",
      card4: "Grafik Perkembangan Penduduk",
      card5: "Jumlah Alat KB Valid",
      card6: "Frekuensi Pengujian KB",
      card7: "Index Harga KB",
      card8: "Update Harga KB Terkini"
    }
  },
  {
    id: 5,
    industrialData: {
      totalRegistered: 800,
      permitsThisMonth: 150,
      districts: [
        { name: 'Region A', count: 200 },
        { name: 'Region B', count: 150 },
        { name: 'Region C', count: 250 },
        { name: 'Region D', count: 200 }
      ]
    },
    measurementData: [
      { name: 'Audit', value: 50 },
      { name: 'Pengawasan', value: 30 },
      { name: 'Evaluasi', value: 20 }
    ],
    developmentChartData: [
      { name: 'Jan', dataset1: 2, dataset2: 4 },
      { name: 'Feb', dataset1: 3, dataset2: 5 },
      { name: 'Mar', dataset1: 5, dataset2: 3 },
      { name: 'Apr', dataset1: 7, dataset2: 2 },
      { name: 'Mei', dataset1: 9, dataset2: 4 },
      { name: 'Jun', dataset1: 8, dataset2: 6 },
      { name: 'Jul', dataset1: 6, dataset2: 7 },
      { name: 'Agu', dataset1: 4, dataset2: 5 },
      { name: 'Sep', dataset1: 6, dataset2: 3 },
      { name: 'Okt', dataset1: 7, dataset2: 4 },
      { name: 'Nov', dataset1: 5, dataset2: 6 },
      { name: 'Des', dataset1: 3, dataset2: 7 }
    ],
    marketPrices: [
      { name: 'Laporan Audit', price: '1.000.000', unit: 'Dokumen', lastUpdate: '30 April 2025' },
      { name: 'Konsultasi', price: '3.000.000', unit: 'Sesi', lastUpdate: '30 April 2025' },
      { name: 'Buku Panduan', price: '200.000', unit: 'Unit', lastUpdate: '30 April 2025' },
      { name: 'Pelatihan', price: '5.000.000', unit: 'Kelas', lastUpdate: '30 April 2025' },
      { name: 'Dokumen', price: '500.000', unit: 'Paket', lastUpdate: '30 April 2025' }
    ],
    foodProducts: [
      { name: 'Laporan Audit', image: '/api/placeholder/60/60', altText: 'Ikon Laporan Audit' },
      { name: 'Konsultasi', image: '/api/placeholder/60/60', altText: 'Ikon Konsultasi' },
      { name: 'Buku Panduan', image: '/api/placeholder/60/60', altText: 'Ikon Buku Panduan' },
      { name: 'Pelatihan', image: '/api/placeholder/60/60', altText: 'Ikon Pelatihan' },
      { name: 'Dokumen', image: '/api/placeholder/60/60', altText: 'Ikon Dokumen' },
      { name: 'Formulir', image: '/api/placeholder/60/60', altText: 'Ikon Formulir' },
      { name: 'Poster', image: '/api/placeholder/60/60', altText: 'Ikon Poster' },
      { name: 'Brosur', image: '/api/placeholder/60/60', altText: 'Ikon Brosur' },
      { name: 'Laptop', image: '/api/placeholder/60/60', altText: 'Ikon Laptop' },
      { name: 'Proyektor', image: '/api/placeholder/60/60', altText: 'Ikon Proyektor' }
    ],
    cardTitles: {
      card1: "Instansi Terdaftar",
      card2: "Laporan Pengawasan",
      card3: "Distribusi Instansi",
      card4: "Grafik Perkembangan Pengawasan",
      card5: "Jumlah Dokumen Valid",
      card6: "Frekuensi Pengujian Dokumen",
      card7: "Index Harga Dokumen",
      card8: "Update Harga Dokumen Terkini"
    }
  }
];

const OrganisasiDetailPage = () => {
  const { id } = useParams();
  const backendId = parseInt(id);

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching organization with backendId: ${backendId}`);
        const response = await getOrganizationById(backendId);
        console.log('API Response:', response);

        const apiData = response.data || response;
        console.log('API Data:', apiData);

        if (!apiData || typeof apiData.id === 'undefined') {
          throw new Error('API response does not contain a valid ID');
        }

        const apiId = apiData.id;
        console.log('API ID:', apiId);

        const idMapping = {
          3: 1,
          5: 2,
          4: 3,
          6: 4,
          1: 5
        };
        const dummyId = idMapping[apiId];
        if (dummyId === undefined) {
          throw new Error(`No mapping found for API ID: ${apiId}`);
        }
        console.log('Mapped Dummy ID:', dummyId);

        let dummyOrg = organizations.find(org => org.id === dummyId);
        if (!dummyOrg) {
          throw new Error(`No dummy organization found for mapped ID: ${dummyId}`);
        }
        console.log('Matched Dummy Org:', dummyOrg);

        // Jika backendId adalah 5, ambil data tabel dari endpoint /organizations/5/tables/5 dan /organizations/5/tables/6
        let tableData = null;
        let measurementTableData = null;
        if (backendId === 5) {
          try {
            // Ambil data untuk Jumlah Pedagang (Card 3)
            tableData = await getTableById(5, 5);
            console.log('Table Data (ID 5):', tableData);
          } catch (tableError) {
            console.error('Error fetching table data (ID 5):', tableError);
            // Lanjutkan meskipun gagal mengambil data tabel
          }

          try {
            // Ambil data untuk Frekuensi Pengujian Alat Dagang (Card 6)
            measurementTableData = await getTableById(5, 6);
            console.log('Measurement Table Data (ID 6):', measurementTableData);
          } catch (tableError) {
            console.error('Error fetching measurement table data (ID 6):', tableError);
            // Lanjutkan dengan data dummy jika gagal
          }
        }

        // Perbarui dummyOrg untuk id=2 (backendId=5) dengan data tabel
        if (dummyId === 2) {
          let updatedDistricts = dummyOrg.industrialData.districts;
          let updatedMeasurementData = dummyOrg.measurementData;
          let updatedCardTitles = { ...dummyOrg.cardTitles };

          // Update data untuk Jumlah Pedagang (Card 3)
          if (tableData) {
            updatedDistricts = tableData.rows.map(row => ({
              name: row.data.kecamatan,
              count: parseInt(row.data['jumlah pedagang'])
            }));
            updatedCardTitles.card3 = tableData.description || dummyOrg.cardTitles.card3;
          }

          // Update data untuk Frekuensi Pengujian Alat Dagang (Card 6)
          if (measurementTableData) {
            updatedMeasurementData = Object.entries(measurementTableData.rows[0].data).map(([name, value]) => ({
              name,
              value: parseInt(value)
            }));
            updatedCardTitles.card6 = measurementTableData.description || dummyOrg.cardTitles.card6;
          }

          dummyOrg = {
            ...dummyOrg,
            industrialData: {
              ...dummyOrg.industrialData,
              districts: updatedDistricts
            },
            measurementData: updatedMeasurementData,
            cardTitles: updatedCardTitles
          };
        }

        const combinedOrganization = {
          ...dummyOrg,
          name: apiData.name || 'Nama Tidak Tersedia',
          logo_url: apiData.logo_path || apiData.logo_url || '/images/default-organization.png',
          description: apiData.description || 'Deskripsi tidak tersedia',
          sector: apiData.sector?.name || 'Tidak ada sektor',
          dataset_count: apiData.dataset_count || 0,
          last_updated_formatted: apiData.last_updated_formatted || 'Belum pernah diperbarui'
        };
        console.log('Combined Organization:', combinedOrganization);

        setOrganization(combinedOrganization);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching organization:', err);
        setError(err.response?.status
          ? `Request failed with status code ${err.response.status}: ${err.response.data?.message || 'Internal server error'}`
          : err.message || 'Failed to connect to the server');
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [backendId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-700 mt-4">Memuat data...</p>
        </div>
      </Layout>
    );
  }

  if (error || !organization) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff]">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-[#02033b] mb-4">
              {error ? `Error: ${error}` : `Organisasi tidak ditemukan untuk ID: ${backendId}`}
            </h1>
            <p className="text-gray-600 mb-4">Silakan periksa log konsol untuk detail error atau coba lagi nanti.</p>
            <Link to="/organisasi" className="text-[#3a9ec9] hover:text-[#2a8bb7] flex items-center justify-center">
              <FiArrowLeft className="mr-2" />
              Kembali ke Daftar Organisasi
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { industrialData, measurementData, developmentChartData, marketPrices, foodProducts, cardTitles } = organization;

  const COLORS = ['#8A2BE2', '#4169E1', '#FF69B4'];

  // Custom Tooltip Component untuk PieChart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
          <p className="text-sm text-gray-700">{`${data.name}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Label untuk PieChart agar lebih dekat ke segmen
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    // Mengatur jarak label lebih dekat ke segmen (tambahkan hanya 10 piksel dari outerRadius)
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
      >
        {value}
      </text>
    );
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-32 pb-16 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                <div className="w-20 h-20 rounded-lg bg-white bg-opacity-20 flex items-center justify-center border-2 border-white border-opacity-30">
                  <img src={organization.logo_url} alt={organization.name} className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold uppercase">{organization.name}</h1>
                  <p className="text-xl opacity-90">{organization.sector}</p>
                  <p className="text-sm opacity-80 mt-2">{organization.last_updated_formatted}</p>
                  <p className="text-sm opacity-80 mt-2 max-w-2xl">{organization.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Baris pertama - 3 box dengan ukuran yang sama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Card 1: Industri Terdaftar */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Database className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card1}</span>
              </div>
              <div className="text-4xl font-bold">{industrialData.totalRegistered.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Seluruh Sektor</div>
            </div>

            {/* Card 2: Izin Ulasan */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Eye className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card2}</span>
              </div>
              <div className="text-4xl font-bold">{industrialData.permitsThisMonth.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Hingga Bulan Ini</div>
            </div>

            {/* Card 3: Distribusi Pedagang */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Database className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card3}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {industrialData.districts.map((district, index) => (
                  <div key={index} className="bg-blue-100 rounded-lg p-2 flex justify-between items-center">
                    <span className="text-sm font-medium">{district.name}</span>
                    <span className="font-bold">{district.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Baris kedua */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            {/* Box 1: Grafik Perkembangan */}
            <div className="bg-white rounded-lg shadow p-4 col-span-12 md:col-span-6">
              <h3 className="font-medium text-gray-700 mb-2">{cardTitles.card4}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={developmentChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval="preserveStartEnd" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="dataset1"
                      stroke="#51c3f2"
                      strokeWidth={2}
                      name="Dataset 1"
                    />
                    <Line
                      type="monotone"
                      dataKey="dataset2"
                      stroke="#000000"
                      strokeWidth={2}
                      name="Dataset 2"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Box 2: Jumlah Alat Ukur Valid */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center col-span-12 md:col-span-3 h-full">
              <img src="/images/ukur.png" alt="Ikon alat ukur" className="w-12 h-12 mb-4" />
              <div className="text-4xl font-bold text-gray-800 mb-4">{industrialData.totalRegistered.toLocaleString()}</div>
              <span className="font-medium text-gray-700 text-center">{cardTitles.card5}</span>
            </div>

            {/* Box 3: Frekuensi Pengujian Alat Dagang */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center col-span-12 md:col-span-3">
              <h3 className="font-medium text-gray-700 mb-2 text-center">{cardTitles.card6}</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={measurementData}
                      cx="50%"
                      cy="50%"
                      label={renderCustomLabel} // Kembalikan label statis
                      labelLine={false} // Tidak ada garis panjang
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={5}
                      isAnimationActive={true}
                    >
                      {measurementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value, entry, index) => (
                        <span className="text-xs">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Baris ketiga */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            {/* Index Harga Pasar */}
            <div className="bg-white rounded-lg shadow p-4 col-span-12 md:col-span-6">
              <h3 className="font-medium text-gray-700 mb-3">{cardTitles.card7}</h3>
              <div className="grid grid-cols-5 gap-2">
                {foodProducts.map((product, index) => (
                  <div key={index} className="border rounded-lg p-2 flex flex-col items-center">
                    <img src={product.image} alt={product.altText} className="w-12 h-12 mb-1" />
                    <span className="text-xs text-center">{product.name}</span>
                  </div>
                ))}
                <div className="border rounded-lg p-2 flex flex-col items-center justify-center bg-blue-50 col-span-2">
                  <p className="text-sm text-blue-800 text-center">Perdagangan yang sehat, ekonomi yang kuat</p>
                </div>
              </div>
            </div>

            {/* Update Harga Pasar Terkini */}
            <div className="bg-white rounded-lg shadow p-4 col-span-12 md:col-span-6">
              <h3 className="font-medium text-gray-700 mb-3">{cardTitles.card8}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-2 px-3 text-left text-sm">Nama Barang</th>
                      <th className="py-2 px-3 text-left text-sm">Harga Satuan (Rp)</th>
                      <th className="py-2 px-3 text-left text-sm">Satuan</th>
                      <th className="py-2 px-3 text-left text-sm">Update Terakhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketPrices.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-3 text-sm">{item.name}</td>
                        <td className="py-2 px-3 text-sm">{item.price}</td>
                        <td className="py-2 px-3 text-sm">{item.unit}</td>
                        <td className="py-2 px-3 text-sm">{item.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganisasiDetailPage;