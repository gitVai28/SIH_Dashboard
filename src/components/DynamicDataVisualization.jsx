import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label
} from 'recharts';
import { motion } from 'framer-motion';
import disasterData from './combined_disaster_data.json';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const DataSourceVisualization = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    setData(disasterData);
  }, []);

  // Function to filter data by month and year
  const filterDataByDate = (data) => {
    return data.filter((item) => {
      const [year, month] = item.date.split('-');
      return (
        (!selectedYear || selectedYear === year) &&
        (!selectedMonth || selectedMonth === month)
      );
    });
  };

  // Filtered data based on selected month and year
  const filteredData = filterDataByDate(data);

  const sourceData = filteredData.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(sourceData).map(([name, value]) => ({ name, value }));

  const disasterTypeData = filteredData.reduce((acc, item) => {
    acc[item.disaster_type] = (acc[item.disaster_type] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(disasterTypeData).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Disaster Data Visualization</h1>

          {/* Filters for month and year */}
          <div className="flex items-center mb-8 space-x-8">
            <div>
              <label className="text-gray-700 font-semibold">Filter by Month:</label>
              <select
                className="ml-2 p-2 border rounded"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-semibold">Filter by Year:</label>
              <select
                className="ml-2 p-2 border rounded"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>
          </div>

          

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Disaster Content</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {filteredData.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="text-sm text-gray-500">{item.date} {item.time}</p>
                  <p className="mt-2 text-gray-800">{item.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {item.disaster_type}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {item.location}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {item.source}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-4 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0 7.24 0 8.91.81 10 2.09 11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18z"/>
                      </svg>
                      {item.likes}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                      </svg>
                      {item.retweets}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Data Sources</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Disaster Types</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name">
                    <Label value="Disaster Types" offset={-5} position="insideBottom" />
                  </XAxis>
                  <YAxis>
                    <Label value="Count" angle={-90} position="insideLeft" />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceVisualization;