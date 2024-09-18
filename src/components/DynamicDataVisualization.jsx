import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import disasterData from './combined_disaster_data.json';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const DataSourceVisualization = () => {
  const [data, setData] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    setData(disasterData);
  }, []);

  const sourceData = data.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(sourceData).map(([name, value]) => ({ name, value }));

  const disasterTypeData = data.reduce((acc, item) => {
    acc[item.disaster_type] = (acc[item.disaster_type] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(disasterTypeData).map(([name, value]) => ({ name, value }));

  const handleSourceClick = (source) => {
    setSelectedSource(source === selectedSource ? null : source);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Disaster Data Visualization</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Data Sources</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Data Sources</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.entries(sourceData).map(([source, count]) => (
                <motion.div
                  key={source}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedSource === source ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSourceClick(source)}
                >
                  <h3 className="text-lg font-medium text-gray-800">{source}</h3>
                  <p className="text-sm text-gray-600">Count: {count}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedSource && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Content from {selectedSource}</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                {data
                  .filter(item => item.source === selectedSource)
                  .map((item, index) => (
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSourceVisualization;