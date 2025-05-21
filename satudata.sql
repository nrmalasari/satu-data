-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2025 at 10:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `satudata`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1747559640),
('laravel_cache_356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1747559640;', 1747559640),
('laravel_cache_livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3', 'i:1;', 1747811811),
('laravel_cache_livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3:timer', 'i:1747811811;', 1747811811);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_dataset_columns`
--

CREATE TABLE `custom_dataset_columns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `custom_dataset_table_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `header` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'string' COMMENT 'Tipe data: string, integer, float, date, boolean, datetime',
  `visible` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Apakah kolom ditampilkan',
  `order_index` int(11) NOT NULL DEFAULT 0 COMMENT 'Urutan kolom',
  `filter_type` varchar(255) NOT NULL DEFAULT 'text' COMMENT 'Tipe filter: text, number, select, dll',
  `description` varchar(255) DEFAULT NULL COMMENT 'Deskripsi tambahan untuk kolom',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_dataset_columns`
--

INSERT INTO `custom_dataset_columns` (`id`, `custom_dataset_table_id`, `name`, `header`, `type`, `visible`, `order_index`, `filter_type`, `description`, `created_at`, `updated_at`) VALUES
(4, 3, 'golongan usaha', 'GOLONGAN USAHA', 'string', 1, 0, 'text', NULL, '2025-05-15 09:44:36', '2025-05-16 20:23:47'),
(5, 3, '2020', '2020', 'integer', 1, 1, 'number', NULL, '2025-05-16 20:27:46', '2025-05-17 00:13:58'),
(6, 3, '2021', '2021', 'integer', 1, 2, 'number', NULL, '2025-05-16 20:30:15', '2025-05-17 00:14:45'),
(7, 3, '2022', '2022', 'integer', 1, 3, 'number', NULL, '2025-05-16 20:31:21', '2025-05-17 00:15:03'),
(8, 3, '2023', '2023', 'integer', 1, 4, 'number', NULL, '2025-05-16 20:32:51', '2025-05-17 00:15:34'),
(9, 3, '2024', '2024', 'integer', 1, 5, 'number', NULL, '2025-05-16 20:34:13', '2025-05-17 00:15:50'),
(10, 4, 'kecamatan', 'KECAMATAN', 'string', 1, 0, 'text', NULL, '2025-05-17 00:57:43', '2025-05-17 00:57:43'),
(11, 4, 'koperasi aktif', 'KOPERASI AKTIF', 'integer', 1, 1, 'number', NULL, '2025-05-17 00:58:45', '2025-05-17 00:58:45'),
(12, 4, 'koperasi tidak aktif', 'KOPERASI TIDAK AKTIF', 'integer', 1, 2, 'number', NULL, '2025-05-17 00:59:36', '2025-05-17 00:59:36'),
(13, 4, 'umkm', 'UMKM', 'integer', 1, 3, 'number', NULL, '2025-05-17 01:00:23', '2025-05-17 01:00:23'),
(14, 4, 'koperasi yang mengadakan rapat anggota tahunan', 'KOPERASI YANG MANGADAKAN RAPAT ANGGOTA TAHUNAN', 'integer', 1, 4, 'number', NULL, '2025-05-17 01:01:23', '2025-05-17 01:01:23'),
(16, 4, 'sertifikasi koperasi yang di terbitkan', 'SERTIFIKAT KOPERASI YANG DITERBITKAN', 'integer', 1, 5, 'number', NULL, '2025-05-17 01:03:45', '2025-05-17 01:06:31'),
(17, 4, 'jumlah', 'JUMLAH', 'integer', 1, 6, 'number', NULL, '2025-05-17 01:06:59', '2025-05-17 01:07:59'),
(19, 5, 'kecamatan', 'KECAMATAN', 'string', 1, 0, 'text', NULL, '2025-05-19 08:16:05', '2025-05-19 08:16:05'),
(20, 5, 'jumlah pedagang', 'JUMLAH PEDAGANG', 'integer', 1, 1, 'number', NULL, '2025-05-19 08:17:37', '2025-05-19 08:17:37'),
(21, 6, 'Balai Ukur Satuan', 'BALAI UKUR SATUAN', 'integer', 1, 0, 'number', NULL, '2025-05-20 04:10:11', '2025-05-20 04:10:11'),
(22, 6, 'Alat Tera', 'ALAT TERA', 'integer', 1, 1, 'number', NULL, '2025-05-20 04:11:03', '2025-05-20 04:11:03'),
(23, 6, 'Alat Tera Bantu', 'ALAT TERA BANTU', 'integer', 1, 2, 'number', NULL, '2025-05-20 04:12:07', '2025-05-20 04:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `custom_dataset_rows`
--

CREATE TABLE `custom_dataset_rows` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `custom_dataset_table_id` bigint(20) UNSIGNED NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Data baris dalam format JSON' CHECK (json_valid(`data`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_dataset_rows`
--

INSERT INTO `custom_dataset_rows` (`id`, `custom_dataset_table_id`, `data`, `created_at`, `updated_at`) VALUES
(1, 3, '{\"golongan usaha\":\"UNIT USAHA\",\"2020\":\"1372\",\"2021\":\"1238\",\"2022\":\"11489\",\"2023\":\"1224\",\"2024\":\"1486\"}', '2025-05-16 20:37:37', '2025-05-17 00:13:39'),
(2, 3, '{\"golongan usaha\":\"TENAGA KERJA (ORANG)\",\"2020\":\"4624\",\"2021\":\"4288\",\"2022\":\"4032\",\"2023\":\"4032\",\"2024\":\"4501\"}', '2025-05-16 21:02:23', '2025-05-16 21:02:23'),
(3, 3, '{\"golongan usaha\":\"NILAI INVESTASI\",\"2020\":\"84295468\",\"2021\":\"83911909\",\"2022\":\"89991909\",\"2023\":\"77226134\",\"2024\":\"92213069\"}', '2025-05-16 21:09:06', '2025-05-16 21:09:06'),
(4, 3, '{\"golongan usaha\":\"NILAI PRODUKSI\",\"2020\":\"200664555\",\"2021\":\"632619426\",\"2022\":\"632613426\",\"2023\":\"631171022\",\"2024\":\"751971496\"}', '2025-05-16 21:12:45', '2025-05-16 21:12:45'),
(5, 3, '{\"golongan usaha\":\"NILAI BAHAN BAKU \",\"2020\":\"155730339\",\"2021\":\"100197660\",\"2022\":\"100197660\",\"2023\":\"87241791\",\"2024\":\"116658889\"}', '2025-05-16 21:19:12', '2025-05-16 21:19:12'),
(6, 4, '{\"kecamatan\":\"BACUKIKI\",\"koperasi aktif\":\"8\",\"koperasi tidak aktif\":\"11\",\"umkm\":\"2263\",\"koperasi yang mengadakan rapat anggota tahunan\":\"3\",\"sertifikasi koperasi yang di terbitkan\":\"3\",\"jumlah\":\"2288\"}', '2025-05-17 01:09:01', '2025-05-17 01:09:01'),
(7, 4, '{\"kecamatan\":\"BACUKIKI BARAT\",\"koperasi aktif\":\"48\",\"koperasi tidak aktif\":\"29\",\"umkm\":\"4963\",\"koperasi yang mengadakan rapat anggota tahunan\":\"14\",\"sertifikasi koperasi yang di terbitkan\":\"14\",\"jumlah\":\"5068\"}', '2025-05-17 01:11:12', '2025-05-17 01:11:12'),
(8, 4, '{\"kecamatan\":\"SOREANG\",\"koperasi aktif\":\"30\",\"koperasi tidak aktif\":\"34\",\"umkm\":\"4568\",\"koperasi yang mengadakan rapat anggota tahunan\":\"17\",\"sertifikasi koperasi yang di terbitkan\":\"17\",\"jumlah\":\"4666\"}', '2025-05-17 01:12:33', '2025-05-17 01:12:33'),
(9, 4, '{\"kecamatan\":\"UJUNG\",\"koperasi aktif\":\"36\",\"koperasi tidak aktif\":\"26\",\"umkm\":\"4540\",\"koperasi yang mengadakan rapat anggota tahunan\":\"7\",\"sertifikasi koperasi yang di terbitkan\":\"7\",\"jumlah\":\"4616\"}', '2025-05-17 01:13:58', '2025-05-17 01:13:58'),
(10, 5, '{\"kecamatan\":\"BACUKIKI\",\"jumlah pedagang\":\"659\"}', '2025-05-19 08:32:46', '2025-05-20 03:46:45'),
(11, 5, '{\"kecamatan\":\"BACUKIKI BARAT\",\"jumlah pedagang\":\"970\"}', '2025-05-19 08:41:47', '2025-05-19 08:41:47'),
(12, 5, '{\"kecamatan\":\"UJUNG\",\"jumlah pedagang\":\"660\"}', '2025-05-19 08:42:20', '2025-05-19 08:42:20'),
(13, 5, '{\"kecamatan\":\"SOREANG\",\"jumlah pedagang\":\"958\"}', '2025-05-19 08:42:55', '2025-05-19 08:42:55'),
(14, 6, '{\"Balai Ukur Satuan\":\"35\",\"Alat Tera\":\"15\",\"Alat Tera Bantu\":\"50\"}', '2025-05-20 04:14:52', '2025-05-20 04:14:52');

-- --------------------------------------------------------

--
-- Table structure for table `custom_dataset_tables`
--

CREATE TABLE `custom_dataset_tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Nama tabel kustom',
  `organization_id` bigint(20) UNSIGNED NOT NULL,
  `sector_id` bigint(20) UNSIGNED NOT NULL,
  `table_type` varchar(255) NOT NULL DEFAULT 'manual' COMMENT 'Tipe tabel: manual, excel, dll',
  `editable` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Apakah tabel bisa diedit dari frontend',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_dataset_tables`
--

INSERT INTO `custom_dataset_tables` (`id`, `title`, `organization_id`, `sector_id`, `table_type`, `editable`, `created_at`, `updated_at`, `is_public`, `description`) VALUES
(3, 'Perkembangan Industri Kecil Dan Menengah Tahun 2020-2024', 5, 6, 'manual', 1, '2025-05-15 09:43:45', '2025-05-18 18:24:03', 1, 'Perkembangan Industri Kecil Pareoare 2020-2024'),
(4, 'Jumlah Koperasi dan UMKM di Kota Parepare Tahun 2024', 4, 12, 'manual', 1, '2025-05-17 00:55:58', '2025-05-20 02:32:28', 1, 'UMKM Parepare 2024'),
(5, 'JUMLAH PEDAGANG MENURUT KECAMATAN DI KOTA PAREPARE TAHUN 2022', 5, 6, 'manual', 1, '2025-05-19 08:13:50', '2025-05-19 22:19:25', 1, 'jumlah pedangan 2022'),
(6, 'Pengujian Alat Dagang', 5, 6, 'manual', 1, '2025-05-20 04:03:05', '2025-05-20 04:15:06', 1, 'Frekuensi Pengujian Alat Dagang');

-- --------------------------------------------------------

--
-- Table structure for table `datasets`
--

CREATE TABLE `datasets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `custom_dataset_table_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `file_path` varchar(2048) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `file_size` varchar(255) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `downloads` int(11) NOT NULL DEFAULT 0,
  `published_date` date NOT NULL,
  `year` year(4) DEFAULT NULL COMMENT 'Tahun dataset',
  `organization_id` bigint(20) UNSIGNED NOT NULL,
  `sector_id` bigint(20) UNSIGNED NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_public` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `datasets`
--

INSERT INTO `datasets` (`id`, `custom_dataset_table_id`, `title`, `description`, `file_path`, `file_name`, `file_type`, `file_size`, `views`, `downloads`, `published_date`, `year`, `organization_id`, `sector_id`, `tags`, `is_featured`, `is_public`, `created_at`, `updated_at`) VALUES
(3, NULL, 'TRANSAKSI TANDA TANGAN ELEKTRONIK TAHUN 2024', NULL, 'datasets/1746625077_TRANSAKSI TANDA TANGAN ELEKTRONIK TAHUN 2024.xlsx', 'TRANSAKSI TANDA TANGAN ELEKTRONIK TAHUN 2024.xlsx', 'excel', '14 bytes', 2, 0, '2025-05-07', '2024', 3, 5, NULL, 0, 1, '2025-05-07 05:37:57', '2025-05-11 23:31:34'),
(4, NULL, 'PENAMBAHAN PENGGUNA DAN PEMILIK SERTIFIKAT ELEKTRONIK TAHUN 2024', NULL, 'datasets/1746626437_PENAMBAHAN PENGGUNA DAN PEMILIK SERTIFIKAT ELEKTRONIK TAHUN 2024.xlsx', 'PENAMBAHAN PENGGUNA DAN PEMILIK SERTIFIKAT ELEKTRONIK TAHUN 2024.xlsx', 'excel', '15.35 KB', 0, 0, '2025-05-07', '2024', 3, 5, NULL, 0, 1, '2025-05-07 06:00:37', '2025-05-07 06:00:37'),
(5, NULL, 'NILAI EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL (EPSS) KOTA PAREPARE TAHUN 2023 -2024', NULL, 'datasets/1746626735_NILAI EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL (EPSS) KOTA PAREPARE TAHUN 2023 -2024.xlsx', 'NILAI EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL (EPSS) KOTA PAREPARE TAHUN 2023 -2024.xlsx', 'excel', '13.39 KB', 0, 0, '2025-05-07', '2023', 3, 5, NULL, 0, 1, '2025-05-07 06:05:35', '2025-05-07 06:05:35'),
(6, NULL, 'Banyaknya Free Hostpot , Menara dan Website Tahun 2020 - 2024', NULL, 'datasets/1746626858_Banyaknya Free Hostpot , Menara dan Website Tahun 2020 - 2024.xlsx', 'Banyaknya Free Hostpot , Menara dan Website Tahun 2020 - 2024.xlsx', 'excel', '14.2 KB', 2, 0, '2025-05-07', '2021', 3, 5, NULL, 0, 1, '2025-05-07 06:07:38', '2025-05-11 23:52:52'),
(10, NULL, 'DATA USAHA BIDANG PERDAGANGAN KOTA PAREPARE TAHUN 2020-2024', NULL, 'datasets/1746796462_DATA USAHA BIDANG PERDAGANGAN KOTA PAREPARE TAHUN 2020-2024.xlsx', 'DATA USAHA BIDANG PERDAGANGAN KOTA PAREPARE TAHUN 2020-2024.xlsx', 'excel', '16.57 KB', 61, 3, '2025-05-09', '2024', 5, 6, NULL, 0, 1, '2025-05-09 05:14:22', '2025-05-20 23:07:18'),
(14, NULL, 'JUMLAH PEDAGANG MENURUT KECAMATAN DI KOTA PAREPARE TAHUN 2021', NULL, 'datasets/1746804515_JUMLAH PEDAGANG MENURUT KECAMATAN DI KOTA PAREPARE TAHUN 2021.xlsx', 'JUMLAH PEDAGANG MENURUT KECAMATAN DI KOTA PAREPARE TAHUN 2021.xlsx', 'excel', '14.22 KB', 4, 0, '2025-05-09', '2021', 5, 6, NULL, 0, 1, '2025-05-09 07:28:35', '2025-05-19 22:03:42'),
(15, NULL, 'DAFTAR SARANA USAHA PARIWISATA TAHUN 2024', 'file daftar sarana usaha', 'datasets/1747476828_DAFTAR-SARANA-USAHA-PARIWISATA-TAHUN-2024-2.pdf', 'DAFTAR-SARANA-USAHA-PARIWISATA-TAHUN-2024-2.pdf', 'pdf', '123.62 KB', 2, 0, '2025-05-17', '2025', 5, 6, '[]', 1, 1, '2025-05-17 02:13:48', '2025-05-19 23:03:42'),
(16, NULL, 'KOMPILASI ADMINISTRASI DATA STATISTIK SEKTORAL', NULL, 'datasets/1747493087_21.-Kompilasi-Administrasi-Data-Statistik-Sektoral-Dinas-Komunikasi-dan-Informatika.pdf', '21.-Kompilasi-Administrasi-Data-Statistik-Sektoral-Dinas-Komunikasi-dan-Informatika.pdf', 'pdf', '84.96 KB', 0, 0, '2025-05-17', '2025', 3, 5, '[]', 0, 1, '2025-05-17 06:44:47', '2025-05-17 06:44:47'),
(17, NULL, 'JUMLAH KOPERASI YANG TERDAFTAR DAN AKTIF MENURUT KECAMATAN DAN FUNGSI KOPERASI DI KOTA PAREPARE TAHUN 2022', 'jumplah koperasi 2022', 'datasets/1747555796_JUMLAH KOPERASI YANG TERDAFTAR DAN AKTIF MENURUT KECAMATAN DAN FUNGSI KOPERASI DI KOTA PAREPARE TAHUN 2022.xlsx', 'JUMLAH KOPERASI YANG TERDAFTAR DAN AKTIF MENURUT KECAMATAN DAN FUNGSI KOPERASI DI KOTA PAREPARE TAHUN 2022.xlsx', 'excel', '14.93 KB', 0, 0, '2025-05-18', '2025', 4, 11, '[]', 0, 1, '2025-05-18 00:09:56', '2025-05-18 00:09:56'),
(18, NULL, 'Kategori Aduan Penyimpangan Pelanggaran Tahun 2022', NULL, 'datasets/1747558039_Kategori AduanPenyimpanganPelanggaran Tahun 2022.xlsx', 'Kategori AduanPenyimpanganPelanggaran Tahun 2022.xlsx', 'excel', '13.84 KB', 0, 0, '2025-05-18', '2022', 1, 10, '[]', 0, 1, '2025-05-18 00:47:20', '2025-05-18 00:47:20'),
(19, NULL, 'DAFTAR KADER IMP (PPKBD DAN SUB PPKBD) DI KOTA PAREPARE TAHUN 2022', NULL, 'datasets/1747558541_DAFTAR KADER IMP (PPKBD DAN SUB PPKBD) DI KOTA PAREPARE TAHUN 2022.xlsx', 'DAFTAR KADER IMP (PPKBD DAN SUB PPKBD) DI KOTA PAREPARE TAHUN 2022.xlsx', 'excel', '15.95 KB', 0, 0, '2025-05-18', '2022', 6, 10, '[]', 0, 1, '2025-05-18 00:55:41', '2025-05-18 00:55:41'),
(20, NULL, 'DAFTAR JUMLAH KELUARGA BERISIKO STUNTING DI KOTA PAREPARE SEMESTER 2 (DUA) TAHUN 2023', NULL, 'datasets/1747558976_DAFTAR JUMLAH KELUARGA BERISIKO STUNTING DI KOTA PAREPARE SEMESTER 2 (DUA) TAHUN 2023.xlsx', 'DAFTAR JUMLAH KELUARGA BERISIKO STUNTING DI KOTA PAREPARE SEMESTER 2 (DUA) TAHUN 2023.xlsx', 'excel', '20.92 KB', 0, 0, '2025-05-18', '2023', 6, 10, '[]', 0, 1, '2025-05-18 01:02:56', '2025-05-18 01:02:56'),
(21, NULL, 'DAFTAR JUMLAH AKSEPTOR KB AKTIF MENURUT KELURAHAN DAN ALAT KONTRASEPSI YANG DIGUNAKAN DI KOTA PAREPARE TAHUN 2023', NULL, 'datasets/1747559627_DAFTAR JUMLAH AKSEPTOR KB AKTIF MENURUT KELURAHAN DAN ALAT KONTRASEPSI YANG DIGUNAKAN DI KOTA PAREPARE TAHUN 2023.xlsx', 'DAFTAR JUMLAH AKSEPTOR KB AKTIF MENURUT KELURAHAN DAN ALAT KONTRASEPSI YANG DIGUNAKAN DI KOTA PAREPARE TAHUN 2023.xlsx', 'excel', '17.54 KB', 0, 0, '2025-05-18', '2023', 6, 10, '[]', 0, 1, '2025-05-18 01:13:47', '2025-05-18 01:13:47'),
(25, 3, 'Perkembangan Industri Kecil Dan Menengah Tahun 2020-2024', 'Perkembangan Industri Kecil Parepare 2020-2024', 'datasets/perkembangan-industri-kecil-dan-menengah-tahun-2020-2024_dataset_20250519022403.xlsx', 'perkembangan-industri-kecil-dan-menengah-tahun-2020-2024_dataset_20250519022403.xlsx', 'xlsx', '0.01', 1, 0, '2025-05-19', '2025', 5, 6, '[\"kustom\",\"generated\"]', 0, 1, '2025-05-18 18:24:03', '2025-05-18 19:21:25'),
(27, 5, 'JUMLAH PEDAGANG MENURUT KECAMATAN DI KOTA PAREPARE TAHUN 2022', 'jumlah pedangan 2022', 'datasets/jumlah-pedagang-menurut-kecamatan-di-kota-parepare-tahun-2022_dataset_20250520061924.xlsx', 'jumlah-pedagang-menurut-kecamatan-di-kota-parepare-tahun-2022_dataset_20250520061924.xlsx', 'xlsx', '0.01', 1, 0, '2025-05-20', '2025', 5, 6, '[\"kustom\",\"generated\"]', 0, 1, '2025-05-19 22:19:25', '2025-05-19 22:20:23'),
(29, 4, 'Jumlah Koperasi dan UMKM di Kota Parepare Tahun 2024', 'UMKM Parepare 2024', 'datasets/jumlah-koperasi-dan-umkm-di-kota-parepare-tahun-2024_dataset_20250520103222.xlsx', 'jumlah-koperasi-dan-umkm-di-kota-parepare-tahun-2024_dataset_20250520103222.xlsx', 'xlsx', '0.01', 0, 0, '2025-05-20', '2025', 4, 12, '[\"kustom\",\"generated\"]', 0, 1, '2025-05-20 02:32:28', '2025-05-20 02:32:28'),
(30, 6, 'Pengujian Alat Dagang', 'Frekuensi Pengujian Alat Dagang', 'datasets/pengujian-alat-dagang_dataset_20250520121506.xlsx', 'pengujian-alat-dagang_dataset_20250520121506.xlsx', 'xlsx', '0.01', 0, 0, '2025-05-20', '2025', 5, 6, '[\"kustom\",\"generated\"]', 0, 1, '2025-05-20 04:15:06', '2025-05-20 04:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `infografis`
--

CREATE TABLE `infografis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `published_date` date NOT NULL,
  `sector_id` bigint(20) UNSIGNED NOT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `infografis`
--

INSERT INTO `infografis` (`id`, `title`, `slug`, `image_path`, `views`, `published_date`, `sector_id`, `is_featured`, `is_published`, `created_at`, `updated_at`) VALUES
(7, 'Potret Pertanian Parepare 2024: Luas Perkebunan, Produksi Ternak, dan Upaya Meningkatkan Produktivitas Pertanian', 'sector-pertanian', 'infografis/infografis_Jd3MyBeWTa.jpg', 12, '2025-05-09', 14, 1, 1, '2025-05-09 02:50:17', '2025-05-15 00:51:42'),
(8, 'Perkembangan Kesehatan', 'perkembangan-kesehatan', 'infografis/infografis_8n7MccEjzE.jpg', 31, '2025-05-11', 4, 0, 1, '2025-05-10 22:25:55', '2025-05-20 23:09:29');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_07_035753_create_sectors_table', 1),
(5, '2025_05_07_042056_create_organizations_table', 1),
(6, '2025_05_07_042115_create_datasets_table', 1),
(7, '2025_05_07_052613_change_icon_column_type_in_sectors_table', 1),
(8, '2025_05_07_063923_add_year_to_datasets_table', 2),
(9, '2025_05_07_071549_make_file_type_nullable_in_datasets_table', 3),
(10, '2025_05_07_075901_create_infografis_table', 4),
(11, '2025_05_07_081419_add_slug_to_infografis_table', 5),
(12, '2025_05_07_130803_add_fields_to_organizations_table', 6),
(13, '2025_05_09_081047_create_personal_access_tokens_table', 7),
(14, '2025_05_09_101651_modify_sectors_table_for_icon_url', 8),
(15, '2025_05_09_104326_remove_image_url_from_infografis_table', 9),
(16, '2025_05_09_122308_alter_datasets_file_path_length', 10),
(17, '2025_05_15_092806_create_custom_dataset_tables_table', 11),
(18, '2025_05_15_092821_create_custom_dataset_columns_table', 11),
(19, '2025_05_15_092847_create_custom_dataset_rows_table', 11),
(20, '2025_05_15_110540_update_custom_dataset_columns_table', 12),
(22, '2025_05_17_070733_add_custom_dataset_table_id_to_datasets_table', 13),
(24, '2025_05_17_113656_add_description_to_custom_dataset_tables', 14);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `logo_path` varchar(2048) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `dataset_count` int(11) NOT NULL DEFAULT 0,
  `last_updated` timestamp NULL DEFAULT NULL,
  `sector_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `slug`, `logo_path`, `description`, `dataset_count`, `last_updated`, `sector_id`, `created_at`, `updated_at`) VALUES
(1, 'Inspektorat', 'inspektorat', 'organizations/01JTMQ8MA7TD34A7CHV13PS80P.png', 'Melaksanakan pengawasan internal terhadap penyelenggaraan tugas dan fungsi instansi pemerintah daerah', 1, '2025-05-18 00:47:20', 10, '2025-05-06 22:34:54', '2025-05-18 00:47:20'),
(3, 'Dinas Komunikasi dan Informatika', 'dinas-komunikasi-dan-informatika', 'organizations/01JTNCTRT7WXJJ49HYPB1YJBTB.png', 'Mengelola sistem informasi dan komunikasi pemerintahan kota Parepare', 0, NULL, 5, '2025-05-07 04:51:49', '2025-05-07 04:51:49'),
(4, 'Dinas Ketenaga Kerjaan', 'dinas-ketenaga-kerjaan', 'organizations/01JTNEWXFSBX63ESJCKRBJKKNS.png', 'Mengelola data ketenagakerjaan dan tenaga kerja di kota Parepare', 3, '2025-05-20 02:32:28', 11, '2025-05-07 05:27:56', '2025-05-20 02:32:28'),
(5, 'Dinas Perdaganan', 'dinas-perdaganan', 'organizations/01JTNF159Y3RY215WS457Z0EHF.png', 'Mengatur, mengembangkan, dan mengawasi kegiatan perdagangan serta perlindungan konsumen di wilayah Parepare', 9, '2025-05-20 04:26:18', 6, '2025-05-07 05:30:15', '2025-05-20 23:07:18'),
(6, 'Dinas Pengendalian Penduduk dan Keluarga Berencana', 'dinas-pengendalian-penduduk-dan-keluarga-berencana', 'organizations/01JTNF71HEDP57TE8VBXDD1EQE.png', 'Merencanakan dan mengkoordinasikan pembangunan daerah', 3, '2025-05-18 01:13:47', 10, '2025-05-07 05:33:28', '2025-05-18 01:13:47');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`id`, `name`, `slug`, `icon`, `created_at`, `updated_at`) VALUES
(2, 'Pendidikan', 'pendidikan', 'sector-icons/sector_icon_XA8zBtPW4i.png', '2025-05-06 22:30:50', '2025-05-06 22:30:50'),
(3, 'Keuangan', 'keuangan', 'sector-icons/sector_icon_NCWI0oMwOy.png', '2025-05-07 01:27:50', '2025-05-07 01:27:50'),
(4, 'Kesehatan', 'kesehatan', 'sector-icons/sector_icon_HIXpjqkUuZ.png', '2025-05-07 03:56:01', '2025-05-07 03:56:01'),
(5, 'Telekomunikasi', 'telekomunikasi', 'sector-icons/sector_icon_woMPraiDvw.png', '2025-05-07 03:57:16', '2025-05-07 03:57:16'),
(6, 'Perdagangan', 'perdagangan', 'sector-icons/sector_icon_vyWZFGD4JZ.png', '2025-05-07 03:58:24', '2025-05-07 03:58:24'),
(7, 'Industri', 'industri', 'sector-icons/sector_icon_U6oMyPET7x.png', '2025-05-07 04:12:31', '2025-05-07 04:12:31'),
(8, 'Pariwisata', 'pariwisata', 'sector-icons/sector_icon_vXDT2wRFKW.png', '2025-05-07 04:20:19', '2025-05-07 04:20:19'),
(9, 'Geografis', 'geografis', 'sector-icons/sector_icon_bocoBHSEjE.png', '2025-05-07 04:21:56', '2025-05-07 04:21:56'),
(10, 'Pemerintahan', 'pemerintahan', 'sector-icons/sector_icon_9TRqIDcFkH.png', '2025-05-07 04:22:53', '2025-05-07 04:22:53'),
(11, 'Sosial', 'sosial', 'sector-icons/sector_icon_8qhrSKBV7x.png', '2025-05-07 04:23:48', '2025-05-07 04:23:48'),
(12, 'Kependudukan', 'kependudukan', 'sector-icons/sector_icon_vGT9DkqjcE.png', '2025-05-07 04:25:01', '2025-05-07 04:25:01'),
(13, 'Transportasi', 'transportasi', 'sector-icons/sector_icon_yBD7A8YTo9.png', '2025-05-07 04:25:39', '2025-05-07 04:25:39'),
(14, 'Pertanian', 'pertanian', 'sector-icons/sector_icon_6ykvonGibj.png', '2025-05-09 02:12:09', '2025-05-09 02:19:56');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('akZgutclLsNrhjbWuZwO7W6Kd6qtnZQTwzAaUazW', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiNkY3Q2Z5YVhEVHA4UEtURktaOWtLbUpsVHRxUDRyeE51S0JDcDc0SiI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYWRtaW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6MTc6InBhc3N3b3JkX2hhc2hfd2ViIjtzOjYwOiIkMnkkMTIkc1pUV0xkbjY0dzdrMmg1WlBaLy5XZTVsdmJKYVVWUjVlTEMzNXlyaUI4Vkswd3FiR1duTXUiO30=', 1747816670),
('lOf17PlEV7IabqrfBzoUA77cnWRziU0Jd3vL3JMO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaXk1ZWd5bjJlZ2ExdGlnMDJxUnhUa3NleTRXcG1QNWVrOXoweGFRNSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo2ODoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL2N1c3RvbS1kYXRhc2V0LWNvbHVtbnMvY3JlYXRlP3RhYmxlX2lkPTEiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2ODoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL2N1c3RvbS1kYXRhc2V0LWNvbHVtbnMvY3JlYXRlP3RhYmxlX2lkPTEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1747810675);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'mala', 'satudata@gmail.com', NULL, '$2y$12$sZTWLdn64w7k2h5ZPZ/.We5lvbJaUVR5eLC35yriB8VK0wqbGWnMu', 'e8ZR6uLC0ty3RTHWztOOjZbABzZdW2Os0azsbZKaMXZ43rnL3HDenD7tlCNI', '2025-05-06 22:26:36', '2025-05-06 22:26:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `custom_dataset_columns`
--
ALTER TABLE `custom_dataset_columns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_dataset_columns_visible_order_index_index` (`visible`,`order_index`),
  ADD KEY `custom_dataset_columns_custom_dataset_table_id_foreign` (`custom_dataset_table_id`);

--
-- Indexes for table `custom_dataset_rows`
--
ALTER TABLE `custom_dataset_rows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_dataset_rows_custom_dataset_table_id_foreign` (`custom_dataset_table_id`);

--
-- Indexes for table `custom_dataset_tables`
--
ALTER TABLE `custom_dataset_tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_dataset_tables_organization_id_foreign` (`organization_id`),
  ADD KEY `custom_dataset_tables_sector_id_foreign` (`sector_id`);

--
-- Indexes for table `datasets`
--
ALTER TABLE `datasets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `datasets_organization_id_foreign` (`organization_id`),
  ADD KEY `datasets_sector_id_foreign` (`sector_id`),
  ADD KEY `datasets_custom_dataset_table_id_foreign` (`custom_dataset_table_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `infografis`
--
ALTER TABLE `infografis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `infografis_slug_unique` (`slug`),
  ADD KEY `infografis_sector_id_foreign` (`sector_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organizations_slug_unique` (`slug`),
  ADD KEY `organizations_sector_id_index` (`sector_id`),
  ADD KEY `organizations_slug_index` (`slug`),
  ADD KEY `organizations_last_updated_index` (`last_updated`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sectors_slug_unique` (`slug`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `custom_dataset_columns`
--
ALTER TABLE `custom_dataset_columns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `custom_dataset_rows`
--
ALTER TABLE `custom_dataset_rows`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `custom_dataset_tables`
--
ALTER TABLE `custom_dataset_tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `datasets`
--
ALTER TABLE `datasets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `infografis`
--
ALTER TABLE `infografis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `custom_dataset_columns`
--
ALTER TABLE `custom_dataset_columns`
  ADD CONSTRAINT `custom_dataset_columns_custom_dataset_table_id_foreign` FOREIGN KEY (`custom_dataset_table_id`) REFERENCES `custom_dataset_tables` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `custom_dataset_rows`
--
ALTER TABLE `custom_dataset_rows`
  ADD CONSTRAINT `custom_dataset_rows_custom_dataset_table_id_foreign` FOREIGN KEY (`custom_dataset_table_id`) REFERENCES `custom_dataset_tables` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `custom_dataset_tables`
--
ALTER TABLE `custom_dataset_tables`
  ADD CONSTRAINT `custom_dataset_tables_organization_id_foreign` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `custom_dataset_tables_sector_id_foreign` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `datasets`
--
ALTER TABLE `datasets`
  ADD CONSTRAINT `datasets_custom_dataset_table_id_foreign` FOREIGN KEY (`custom_dataset_table_id`) REFERENCES `custom_dataset_tables` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `datasets_organization_id_foreign` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `datasets_sector_id_foreign` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `infografis`
--
ALTER TABLE `infografis`
  ADD CONSTRAINT `infografis_sector_id_foreign` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organizations`
--
ALTER TABLE `organizations`
  ADD CONSTRAINT `organizations_sector_id_foreign` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
