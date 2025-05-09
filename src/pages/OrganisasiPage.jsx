import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiSearch, FiArrowRight, FiDatabase, FiClock } from 'react-icons/fi';

export const organizations = [
  {
    id: 1,
    name: "Dinas Komunikasi dan Informatika",
    logo: "/icons/kominfo-icon.svg",
    datasets: 42,
    updated: "2 hari lalu",
    sector: "TELEKOMUNIKASI",
    description: "Mengelola sistem informasi dan komunikasi pemerintahan kota Parepare",
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
    name: "Dinas Perdagangan",
    logo: "/icons/trade-icon.svg",
    datasets: 19,
    updated: "5 hari lalu",
    sector: "PERDAGANGAN",
    description: "Mengatur, mengembangkan, dan mengawasi kegiatan perdagangan serta perlindungan konsumen di wilayah Parepare",
    industrialData: {
      totalRegistered: 1204,
      permitsThisMonth: 210,
      districts: [
        { name: 'Soreang', count: 320 },
        { name: 'Bacukiki Barat', count: 250 },
        { name: 'Ujung', count: 210 },
        { name: 'Bacukiki', count: 140 }
      ]
    },
    measurementData: [
      { name: 'Balai Ukur Satuan', value: 35 },
      { name: 'Alat Tera', value: 15 },
      { name: 'Alat Tera Bantu', value: 50 }
    ],
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
      card3: "Distribusi Pedagang",
      card4: "Grafik Perkembangan Pasar",
      card5: "Jumlah Alat Ukur Dagang Valid",
      card6: "Frekuensi Pengujian Alat Dagang",
      card7: "Index Harga Pasar",
      card8: "Update Harga Pasar Terkini"
    }
  },
  {
    id: 3,
    name: "Dinas Ketenaga Kerjaan",
    logo: "/icons/health-icon.svg",
    datasets: 28,
    updated: "3 hari lalu",
    sector: "KEPENDUDUKAN",
    description: "Mengelola layanan Ketenaga Kerjaan masyarakat Parepare",
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
    name: "Dinas Pengendalian Penduduk dan Keluarga Berencana",
    logo: "/icons/planning-icon.svg",
    datasets: 51,
    updated: "1 hari lalu",
    sector: "PEMERINTAHAN",
    description: "Merencanakan dan mengkoordinasikan pembangunan daerah",
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
    name: "Inspektorat",
    logo: "/icons/social-icon.svg",
    datasets: 23,
    updated: "1 minggu lalu",
    sector: "PEMERINTAHAN",
    description: "Melaksanakan pengawasan internal terhadap penyelenggaraan tugas dan fungsi instansi pemerintah daerah",
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