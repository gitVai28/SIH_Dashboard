import React, { useState, useRef } from 'react';
import { AlertTriangle, Droplets, Wind, CloudRain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const weatherData = [
  { id: 1, location: 'Mumbai', weekData: [
    { day: 'Mon', temperature: 32, humidity: 95, windSpeed: 3 },
    { day: 'Tue', temperature: 33, humidity: 93, windSpeed: 4 },
    { day: 'Wed', temperature: 34, humidity: 92, windSpeed: 5 },
    { day: 'Thu', temperature: 33, humidity: 94, windSpeed: 3 },
    { day: 'Fri', temperature: 32, humidity: 96, windSpeed: 2 },
    { day: 'Sat', temperature: 31, humidity: 97, windSpeed: 2 },
    { day: 'Sun', temperature: 32, humidity: 95, windSpeed: 3 },
  ]},
  { id: 2, location: 'Delhi', weekData: [
    { day: 'Mon', temperature: 38, humidity: 90, windSpeed: 30 },
    { day: 'Tue', temperature: 39, humidity: 88, windSpeed: 32 },
    { day: 'Wed', temperature: 40, humidity: 85, windSpeed: 35 },
    { day: 'Thu', temperature: 39, humidity: 87, windSpeed: 33 },
    { day: 'Fri', temperature: 38, humidity: 89, windSpeed: 31 },
    { day: 'Sat', temperature: 37, humidity: 91, windSpeed: 29 },
    { day: 'Sun', temperature: 38, humidity: 90, windSpeed: 30 },
  ]},
  { id: 3, location: 'Chennai', weekData: [
    { day: 'Mon', temperature: 35, humidity: 70, windSpeed: 15 },
    { day: 'Tue', temperature: 36, humidity: 72, windSpeed: 16 },
    { day: 'Wed', temperature: 37, humidity: 75, windSpeed: 18 },
    { day: 'Thu', temperature: 36, humidity: 73, windSpeed: 17 },
    { day: 'Fri', temperature: 35, humidity: 71, windSpeed: 16 },
    { day: 'Sat', temperature: 34, humidity: 69, windSpeed: 14 },
    { day: 'Sun', temperature: 35, humidity: 70, windSpeed: 15 },
  ]},
  { id: 4, location: 'Kolkata', weekData: [
    { day: 'Mon', temperature: 30, humidity: 85, windSpeed: 25 },
    { day: 'Tue', temperature: 31, humidity: 87, windSpeed: 27 },
    { day: 'Wed', temperature: 32, humidity: 89, windSpeed: 29 },
    { day: 'Thu', temperature: 31, humidity: 88, windSpeed: 28 },
    { day: 'Fri', temperature: 30, humidity: 86, windSpeed: 26 },
    { day: 'Sat', temperature: 29, humidity: 84, windSpeed: 24 },
    { day: 'Sun', temperature: 30, humidity: 85, windSpeed: 25 },
  ]},
];

const predictDisaster = (temperature, humidity, windSpeed) => {
  if (temperature > 35 && humidity > 80) {
    return { type: 'Extreme Humidity', risk: 'Moderate', icon: <Droplets className="text-orange-500" size={24} /> };
  } else if (humidity > 80 && windSpeed > 20) {
    return { type: 'Cyclone', risk: 'High', icon: <Wind className="text-blue-500" size={24} /> };
  } else if (humidity > 80 && temperature > 30) {
    return { type: 'Flood', risk: 'High', icon: <CloudRain className="text-blue-700" size={24} /> };
  }
  return null;
};

const PredictiveAnalysis = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const chartRef = useRef(null);  // Create a ref for the chart section

  const riskyLocations = weatherData.filter(location => 
    predictDisaster(
      Math.max(...location.weekData.map(day => day.temperature)),
      Math.max(...location.weekData.map(day => day.humidity)),
      Math.max(...location.weekData.map(day => day.windSpeed))
    )
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location === selectedLocation ? null : location);
    
    // Scroll to the chart if a location is selected
    if (location && chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl">
      <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300 flex items-center">
        <AlertTriangle className="mr-2" size={24} />
        <p><strong>Disclaimer:</strong> This prediction is made by AI and can make mistakes. Please use this information as a general guide only.</p>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Indian Weekly Predictive Disaster Analysis</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {riskyLocations.map((location) => {
          const maxTemperature = Math.max(...location.weekData.map(day => day.temperature));
          const maxHumidity = Math.max(...location.weekData.map(day => day.humidity));
          const maxWindSpeed = Math.max(...location.weekData.map(day => day.windSpeed));
          const prediction = predictDisaster(maxTemperature, maxHumidity, maxWindSpeed);
          return (
            <div 
              key={location.id} 
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 p-4 rounded-lg shadow-md ${
                selectedLocation === location ? 'ring-2 ring-blue-500' : ''
              } ${
                prediction.risk === 'High' ? 'bg-red-100' : 'bg-orange-100'
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              <h3 className="text-lg font-semibold mb-2">{location.location}</h3>
              <div className="flex items-center space-x-2 mb-1">
                {prediction.icon}
                <strong>{prediction.type}</strong>
              </div>
              <p className="text-sm">Risk: {prediction.risk}</p>
              <p className="text-xs mt-2">
                Max Temp: {maxTemperature}°C, 
                Max Humidity: {maxHumidity}%, 
                Max Wind: {maxWindSpeed} km/h
              </p>
            </div>
          );
        })}
      </div>

      {selectedLocation && (
        <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Weekly Weather Trends for {selectedLocation.location}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selectedLocation.weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis 
                yAxisId="left" 
                domain={[0, (dataMax) => Math.ceil(dataMax / 2) * 2]}  // Y-axis for temperature and humidity
                tickCount={8}  // Controls tick count on Y-axis
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                domain={[0, (dataMax) => Math.ceil(dataMax / 2) * 2]}  // Y-axis for wind speed
                tickCount={8}
              />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" />
              <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
              <Line yAxisId="right" type="monotone" dataKey="windSpeed" stroke="#22c55e" name="Wind Speed (km/h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalysis;
