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
      { name: 'Jan', dataset1: 5, dataset2: 7, dataset3: 3, dataset4: 9, dataset5: 4 },
      { name: 'Feb', dataset1: 6, dataset2: 8, dataset3: 4, dataset4: 10, dataset5: 5 },
      { name: 'Mar', dataset1: 8, dataset2: 6, dataset3: 6, dataset4: 8, dataset5: 7 },
      { name: 'Apr', dataset1: 10, dataset2: 5, dataset3: 7, dataset4: 7, dataset5: 6 },
      { name: 'Mei', dataset1: 12, dataset2: 7, dataset3: 9, dataset4: 6, dataset5: 8 },
      { name: 'Jun', dataset1: 11, dataset2: 9, dataset3: 8, dataset4: 5, dataset5: 9 },
      { name: 'Jul', dataset1: 9, dataset2: 10, dataset3: 5, dataset4: 4, dataset5: 10 },
      { name: 'Agu', dataset1: 7, dataset2: 8, dataset3: 3, dataset4: 6, dataset5: 7 },
      { name: 'Sep', dataset1: 9, dataset2: 6, dataset3: 4, dataset4: 8, dataset5: 5 },
      { name: 'Okt', dataset1: 10, dataset2: 7, dataset3: 6, dataset4: 9, dataset5: 4 },
      { name: 'Nov', dataset1: 8, dataset2: 9, dataset3: 5, dataset4: 7, dataset5: 6 },
      { name: 'Des', dataset1: 6, dataset2: 10, dataset3: 7, dataset4: 5, dataset5: 8 }
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
      districts: [] // Will be filled from API for id=5
    },
    measurementData: [], // Will be filled from API
    developmentChartData: [], // Will be filled from API, but add fallback dummy data
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
      card3: "", // Will be filled from API description
      card4: "Grafik Perkembangan Pasar",
      card5: "Jumlah Alat Ukur Dagang Valid",
      card6: "", // Will be filled from API description
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
      { name: 'Jan', dataset1: 4, dataset2: 6, dataset3: 2, dataset4: 8, dataset5: 3 },
      { name: 'Feb', dataset1: 5, dataset2: 7, dataset3: 3, dataset4: 9, dataset5: 4 },
      { name: 'Mar', dataset1: 7, dataset2: 5, dataset3: 5, dataset4: 7, dataset5: 6 },
      { name: 'Apr', dataset1: 9, dataset2: 4, dataset3: 6, dataset4: 6, dataset5: 5 },
      { name: 'Mei', dataset1: 11, dataset2: 6, dataset3: 8, dataset4: 5, dataset5: 7 },
      { name: 'Jun', dataset1: 10, dataset2: 8, dataset3: 7, dataset4: 4, dataset5: 8 },
      { name: 'Jul', dataset1: 8, dataset2: 9, dataset3: 4, dataset4: 3, dataset5: 9 },
      { name: 'Agu', dataset1: 6, dataset2: 7, dataset3: 2, dataset4: 5, dataset5: 6 },
      { name: 'Sep', dataset1: 8, dataset2: 5, dataset3: 3, dataset4: 7, dataset5: 4 },
      { name: 'Okt', dataset1: 9, dataset2: 6, dataset3: 5, dataset4: 8, dataset5: 3 },
      { name: 'Nov', dataset1: 7, dataset2: 8, dataset3: 4, dataset4: 6, dataset5: 5 },
      { name: 'Des', dataset1: 5, dataset2: 9, dataset3: 6, dataset4: 4, dataset5: 7 }
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
      { name: 'Jan', dataset1: 6, dataset2: 8, dataset3: 4, dataset4: 10, dataset5: 5 },
      { name: 'Feb', dataset1: 7, dataset2: 9, dataset3: 5, dataset4: 11, dataset5: 6 },
      { name: 'Mar', dataset1: 9, dataset2: 7, dataset3: 7, dataset4: 9, dataset5: 8 },
      { name: 'Apr', dataset1: 11, dataset2: 6, dataset3: 8, dataset4: 8, dataset5: 7 },
      { name: 'Mei', dataset1: 13, dataset2: 8, dataset3: 10, dataset4: 7, dataset5: 9 },
      { name: 'Jun', dataset1: 12, dataset2: 10, dataset3: 9, dataset4: 6, dataset5: 10 },
      { name: 'Jul', dataset1: 10, dataset2: 11, dataset3: 6, dataset4: 5, dataset5: 11 },
      { name: 'Agu', dataset1: 8, dataset2: 9, dataset3: 4, dataset4: 7, dataset5: 8 },
      { name: 'Sep', dataset1: 10, dataset2: 7, dataset3: 5, dataset4: 9, dataset5: 6 },
      { name: 'Okt', dataset1: 11, dataset2: 8, dataset3: 7, dataset4: 10, dataset5: 5 },
      { name: 'Nov', dataset1: 9, dataset2: 10, dataset3: 6, dataset4: 8, dataset5: 7 },
      { name: 'Des', dataset1: 7, dataset2: 11, dataset3: 8, dataset4: 6, dataset5: 9 }
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
      { name: 'Jan', dataset1: 2, dataset2: 4, dataset3: 1, dataset4: 6, dataset5: 3 },
      { name: 'Feb', dataset1: 3, dataset2: 5, dataset3: 2, dataset4: 7, dataset5: 4 },
      { name: 'Mar', dataset1: 5, dataset2: 3, dataset3: 4, dataset4: 5, dataset5: 6 },
      { name: 'Apr', dataset1: 7, dataset2: 2, dataset3: 5, dataset4: 4, dataset5: 5 },
      { name: 'Mei', dataset1: 9, dataset2: 4, dataset3: 7, dataset4: 3, dataset5: 7 },
      { name: 'Jun', dataset1: 8, dataset2: 6, dataset3: 6, dataset4: 2, dataset5: 8 },
      { name: 'Jul', dataset1: 6, dataset2: 7, dataset3: 3, dataset4: 1, dataset5: 9 },
      { name: 'Agu', dataset1: 4, dataset2: 5, dataset3: 1, dataset4: 3, dataset5: 6 },
      { name: 'Sep', dataset1: 6, dataset2: 3, dataset3: 2, dataset4: 5, dataset5: 4 },
      { name: 'Okt', dataset1: 7, dataset2: 4, dataset3: 4, dataset4: 6, dataset5: 3 },
      { name: 'Nov', dataset1: 5, dataset2: 6, dataset3: 3, dataset4: 4, dataset5: 5 },
      { name: 'Des', dataset1: 3, dataset2: 7, dataset3: 5, dataset4: 2, dataset5: 7 }
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

// Fallback dummy data for id=2 if API fails
const fallbackDevelopmentChartData = [
  { name: 'Jan', dataset1: 4, dataset2: 6, dataset3: 3, dataset4: 8, dataset5: 5 },
  { name: 'Feb', dataset1: 5, dataset2: 7, dataset3: 4, dataset4: 9, dataset5: 6 },
  { name: 'Mar', dataset1: 6, dataset2: 5, dataset3: 5, dataset4: 7, dataset5: 7 },
  { name: 'Apr', dataset1: 7, dataset2: 4, dataset3: 6, dataset4: 6, dataset5: 6 },
  { name: 'Mei', dataset1: 8, dataset2: 6, dataset3: 7, dataset4: 5, dataset5: 8 },
  { name: 'Jun', dataset1: 9, dataset2: 8, dataset3: 6, dataset4: 4, dataset5: 9 },
  { name: 'Jul', dataset1: 7, dataset2: 9, dataset3: 4, dataset4: 3, dataset5: 10 },
  { name: 'Agu', dataset1: 6, dataset2: 7, dataset3: 3, dataset4: 5, dataset5: 7 },
  { name: 'Sep', dataset1: 8, dataset2: 5, dataset3: 4, dataset4: 7, dataset5: 6 },
  { name: 'Okt', dataset1: 9, dataset2: 6, dataset3: 5, dataset4: 8, dataset5: 5 },
  { name: 'Nov', dataset1: 7, dataset2: 8, dataset3: 4, dataset4: 6, dataset5: 7 },
  { name: 'Des', dataset1: 5, dataset2: 9, dataset3: 6, dataset4: 5, dataset5: 8 }
];


// Komponen OrganisasiDetailPage
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
        const response = await getOrganizationById(backendId);
        const apiData = response.data || response;

        if (!apiData || typeof apiData.id === 'undefined') {
          throw new Error('API response does not contain a valid ID');
        }

        const idMapping = { 3: 1, 5: 2, 4: 3, 6: 4, 1: 5 };
        const dummyId = idMapping[apiData.id];
        if (dummyId === undefined) {
          throw new Error(`No mapping found for API ID: ${apiData.id}`);
        }

        let dummyOrg = organizations.find((org) => org.id === dummyId);
        if (!dummyOrg) {
          throw new Error(`No dummy organization found for mapped ID: ${dummyId}`);
        }

        // Fetch tambahan untuk backendId === 5
        let tableData = null;
        let measurementTableData = null;
        let developmentTableData = null;
        if (backendId === 5) {
          try {
            tableData = await getTableById(5, 5);
            measurementTableData = await getTableById(5, 6);
            developmentTableData = await getTableById(5, 3);
          } catch (tableError) {
            console.error('Error fetching table data:', tableError);
          }
        }

        // Update dummyOrg untuk id=2 (backendId=5)
        if (dummyId === 2) {
          let updatedDistricts = dummyOrg.industrialData.districts;
          let updatedMeasurementData = dummyOrg.measurementData;
          let updatedDevelopmentChartData = dummyOrg.developmentChartData;
          let updatedCardTitles = { ...dummyOrg.cardTitles };

          if (tableData) {
            updatedDistricts = tableData.rows.map((row) => ({
              name: row.data.kecamatan,
              count: parseInt(row.data['jumlah pedagang']),
            }));
            updatedCardTitles.card3 = tableData.description || dummyOrg.cardTitles.card3;
          }

          if (measurementTableData) {
            updatedMeasurementData = Object.entries(measurementTableData.rows[0].data).map(([name, value]) => ({
              name,
              value: parseInt(value),
            }));
            updatedCardTitles.card6 = measurementTableData.description || dummyOrg.cardTitles.card6;
          }

          if (developmentTableData) {
            const years = ['2020', '2021', '2022', '2023', '2024'];
            updatedDevelopmentChartData = years.map((year) => {
              const dataPoint = { name: year };
              developmentTableData.rows.forEach((row) => {
                const category = row.data['golongan usaha'].toLowerCase().replace(/\s+/g, '_');
                dataPoint[category] = parseInt(row.data[year]);
              });
              return dataPoint;
            });
            updatedCardTitles.card4 = developmentTableData.description || dummyOrg.cardTitles.card4;
          } else {
            updatedDevelopmentChartData = fallbackDevelopmentChartData;
          }

          dummyOrg = {
            ...dummyOrg,
            industrialData: { ...dummyOrg.industrialData, districts: updatedDistricts },
            measurementData: updatedMeasurementData,
            developmentChartData: updatedDevelopmentChartData,
            cardTitles: updatedCardTitles,
          };
        }

        const combinedOrganization = {
          ...dummyOrg,
          name: apiData.name || 'Nama Tidak Tersedia',
          logo_url: apiData.logo_path || apiData.logo_url || '/images/default-organization.png',
          description: apiData.description || 'Deskripsi tidak tersedia',
          sector: apiData.sector?.name || 'Tidak ada sektor',
          dataset_count: apiData.dataset_count || 0,
          last_updated_formatted: apiData.last_updated_formatted || 'Belum pernah diperbarui',
        };

        setOrganization(combinedOrganization);
        setLoading(false);
      } catch (err) {
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
            <Link to="/organisasi" className="text-[#3a9ec9] hover:text-[#2a8bb7] flex items-center justify-center">
              <FiArrowLeft className="mr-2" /> Kembali ke Daftar Organisasi
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { industrialData, measurementData, developmentChartData, marketPrices, foodProducts, cardTitles } = organization;

  const COLORS = ['#8A2BE2', '#4169E1', '#FF69B4', '#00CED1', '#FF4500'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} fontSize="12">
        {value}
      </text>
    );
  };

  // Definisi lineKeys yang lebih ringkas
  const lineKeys = [
    { dataKey: developmentChartData[0]?.unit_usaha ? 'unit_usaha' : 'dataset1', name: 'Unit Usaha', color: COLORS[0] },
    { dataKey: developmentChartData[0]?.['tenaga_kerja_(orang)'] ? 'tenaga_kerja_(orang)' : 'dataset2', name: 'Tenaga Kerja', color: COLORS[1] },
    { dataKey: developmentChartData[0]?.nilai_investasi ? 'nilai_investasi' : 'dataset3', name: 'Nilai Investasi', color: COLORS[2] },
    { dataKey: developmentChartData[0]?.nilai_produksi ? 'nilai_produksi' : 'dataset4', name: 'Nilai Produksi', color: COLORS[3] },
    { dataKey: developmentChartData[0]?.nilai_bahan_baku ? 'nilai_bahan_baku' : 'dataset5', name: 'Nilai Bahan Baku', color: COLORS[4] },
  ];

  const chartData = developmentChartData.length > 0 ? developmentChartData : fallbackDevelopmentChartData;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Header tetap sama */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-32 pb-16 text-white">
          <div className="container mx-auto px-4">
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
          {/* First Row tetap sama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Database className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card1}</span>
              </div>
              <div className="text-3xl font-bold">{industrialData.totalRegistered.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Seluruh Sektor</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Eye className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card2}</span>
              </div>
              <div className="text-3xl font-bold">{industrialData.permitsThisMonth.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Hingga Bulan Ini</div>
            </div>
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

          {/* Second Row - Grafik Perkembangan Diperbarui */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="bg-white rounded-lg shadow p-4 col-span-12 md:col-span-6">
              <h3 className="font-medium text-gray-700 mb-2">{cardTitles.card4}</h3>
              <div className="h-64"> {/* Ubah dari h-56 ke h-64 untuk ruang lebih */}
                <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                  <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      interval="preserveStartEnd"
                      tick={{ fontSize: 12, fill: '#4b5563' }}
                      stroke="#6b7280"
                    />
                    <YAxis
                      domain={[0, 'auto']} // Pastikan sumbu Y mulai dari 0
                      tick={{ fontSize: 12, fill: '#4b5563' }}
                      stroke="#6b7280"
                      allowDecimals={false} // Hindari desimal untuk data integer
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                    />
                    {lineKeys.map((line, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={line.dataKey}
                        stroke={line.color}
                        strokeWidth={2}
                        name={line.name}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Box 2 dan 3 tetap sama */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center col-span-12 md:col-span-3 h-full">
              <img src="/images/ukur.png" alt="Ikon alat ukur" className="w-12 h-12 mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-4">
                {industrialData.totalRegistered.toLocaleString()}
              </div>
              <span className="font-medium text-gray-700 text-center">{cardTitles.card5}</span>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center col-span-12 md:col-span-3">
              <h3 className="font-medium text-gray-700 mb-2 text-center">{cardTitles.card6}</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={measurementData}
                      cx="50%"
                      cy="50%"
                      label={renderCustomLabel}
                      labelLine={false}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={5}
                    >
                      {measurementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Third Row tetap sama */}
          <div className="grid grid-cols-12 gap-4 mb-4">
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