import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiArrowLeft } from 'react-icons/fi';
import { Database, Eye } from 'lucide-react';
import { organizations } from './OrganisasiPage';
import { 
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const OrganisasiDetailPage = () => {
  const { id } = useParams();
  const organization = organizations.find(org => org.id === parseInt(id));

  if (!organization) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff]">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-[#02033b] mb-4">Organisasi tidak ditemukan</h1>
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

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Layout>
      <div className="mbg-gradient-to-b from-[#e8f1ff] to-[#d6e6ff] min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#51c3f2] to-[#3a9ec9] pt-32 pb-16 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                <div className="w-20 h-20 rounded-lg bg-white bg-opacity-20 flex items-center justify-center border-2 border-white border-opacity-30">
                  <img src={organization.logo} alt={organization.name} className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold uppercase">{organization.name}</h1>
                  <p className="text-xl opacity-90">{organization.sector}</p>
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
            {/* Card 1: Industri Terdaftar - Ukuran seperti pada gambar */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Database className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card1}</span>
              </div>
              <div className="text-4xl font-bold">{industrialData.totalRegistered.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Seluruh Sektor</div>
            </div>

            {/* Card 2: Izin Ulasan - Ukuran seperti pada gambar */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <Eye className="text-gray-500 mr-2" size={20} />
                <span className="font-medium text-gray-700">{cardTitles.card2}</span>
              </div>
              <div className="text-4xl font-bold">{industrialData.permitsThisMonth.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Hingga Bulan Ini</div>
            </div>

            {/* Card 3: Distribusi Industri - Ukuran seperti pada gambar */}
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

          {/* Baris kedua - Layout sesuai gambar */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            {/* Box 1: Grafik Perkembangan - Mengambil 6 kolom */}
            <div className="bg-white rounded-lg shadow p-4 col-span-12 md:col-span-6">
              <h3 className="font-medium text-gray-700 mb-2">{cardTitles.card4}</h3>
              <div className="h-64"> {/* Tinggi lebih besar sesuai gambar */}
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

            {/* Box 2: Jumlah Alat Ukur Valid - Mengambil 3 kolom */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center col-span-12 md:col-span-3 h-full">
              <img src="/images/ukur.png" alt="Ikon alat ukur" className="w-12 h-12 mb-4" />
              <div className="text-4xl font-bold text-gray-800 mb-4">{industrialData.totalRegistered.toLocaleString()}</div>
              <span className="font-medium text-gray-700 text-center">{cardTitles.card5}</span>
            </div>

            {/* Box 3: Frekuensi Pengujian Alat Tera - Mengambil 3 kolom */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center col-span-12 md:col-span-3">
              <h3 className="font-medium text-gray-700 mb-2 text-center">{cardTitles.card6}</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={measurementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={40}  // This creates the donut hole
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={5}
                    >
                      {measurementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [`${value} (${(props.payload.percent * 100).toFixed(0)}%)`, name]}
                    />
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

          {/* Baris ketiga - Layout sesuai gambar */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            {/* Index Harga Pasar - Mengambil 6 kolom */}
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

            {/* Update Harga Pasar Terkini - Mengambil 6 kolom */}
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