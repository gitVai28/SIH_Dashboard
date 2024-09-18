import React, { useState, useEffect } from 'react';
import { Users, Home, Heart } from 'lucide-react';

const RightSidebar = () => {
  const [filters, setFilters] = useState({
    disasterType: '',
    location: '',
    riskLevel: '',
  });

  const [summaries, setSummaries] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [humanImpactData, setHumanImpactData] = useState({
    affected: 0,
    displaced: 0,
    homesLost: 0,
  });

  // Sample JSON data (unchanged)
  const jsonData = [
    {
      "Date": "2024-01-01",
      "DisasterType": "Flood",
      "Location": "Mumbai, India",
      "Summary": "Severe flooding in the area. Many roads submerged, public transport disrupted.",
      "AffectedPeople": 50000,
      "DisplacedPeople": 15000,
      "HomesLost": 2000,
      "RiskLevel": "High"
    },
    {
      "Date": "2024-03-15",
      "DisasterType": "Heatwave",
      "Location": "Delhi, India",
      "Summary": "Extreme temperatures causing health concerns. Hospitals on high alert.",
      "AffectedPeople": 30000,
      "DisplacedPeople": 5000,
      "HomesLost": 100,
      "RiskLevel": "Medium"
    },
    {
      "Date": "2024-11-20",
      "DisasterType": "Cyclone",
      "Location": "Chennai, India",
      "Summary": "Cyclone causing widespread damage. Power outages reported across the city.",
      "AffectedPeople": 70000,
      "DisplacedPeople": 25000,
      "HomesLost": 5000,
      "RiskLevel": "High"
    },
    {
      "Date": "2024-07-05",
      "DisasterType": "Flood",
      "Location": "Kolkata, India",
      "Summary": "Heavy rainfall leading to flooding. Low-lying areas evacuated.",
      "AffectedPeople": 40000,
      "DisplacedPeople": 12000,
      "HomesLost": 1500,
      "RiskLevel": "Medium"
    },
    {
      "Date": "2024-05-10",
      "DisasterType": "Drought",
      "Location": "Bengaluru, India",
      "Summary": "Prolonged dry spell affecting water supply. Water rationing implemented.",
      "AffectedPeople": 20000,
      "DisplacedPeople": 2000,
      "HomesLost": 0,
      "RiskLevel": "Low"
    },
    {
      "Date": "2024-09-01",
      "DisasterType": "Earthquake",
      "Location": "Ahmedabad, India",
      "Summary": "Moderate earthquake causing structural damage. Search and rescue operations ongoing.",
      "AffectedPeople": 25000,
      "DisplacedPeople": 8000,
      "HomesLost": 1000,
      "RiskLevel": "High"
    },
    {
      "Date": "2024-02-14",
      "DisasterType": "Landslide",
      "Location": "Shimla, India",
      "Summary": "Heavy rains trigger landslides in hilly regions. Roads blocked, tourists stranded.",
      "AffectedPeople": 5000,
      "DisplacedPeople": 2000,
      "HomesLost": 500,
      "RiskLevel": "Medium"
    },
    {
      "Date": "2024-06-30",
      "DisasterType": "Tornado",
      "Location": "Noida, India",
      "Summary": "Unexpected tornado causes localized damage. Several buildings affected.",
      "AffectedPeople": 10000,
      "DisplacedPeople": 3000,
      "HomesLost": 800,
      "RiskLevel": "High"
    },
    {
      "Date": "2024-08-22",
      "DisasterType": "Wildfire",
      "Location": "Uttarakhand, India",
      "Summary": "Forest fire spreads to residential areas. Firefighters battling the blaze.",
      "AffectedPeople": 15000,
      "DisplacedPeople": 5000,
      "HomesLost": 1200,
      "RiskLevel": "High"
    },
    {
      "Date": "2024-04-05",
      "DisasterType": "Tsunami",
      "Location": "Andaman Islands, India",
      "Summary": "Small tsunami affects coastal areas. Fishing communities evacuated.",
      "AffectedPeople": 8000,
      "DisplacedPeople": 3000,
      "HomesLost": 600,
      "RiskLevel": "Medium"
    }
  ];

  const disasterTypes = [...new Set(jsonData.map(item => item.DisasterType))];
  const locations = [...new Set(jsonData.map(item => item.Location.split(', ')[0]))];
  const riskLevels = [...new Set(jsonData.map(item => item.RiskLevel))];

  useEffect(() => {
    filterSummaries();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filterSummaries = () => {
    const filteredSummaries = jsonData.filter(item => {
      return (
        (filters.disasterType === '' || item.DisasterType === filters.disasterType) &&
        (filters.location === '' || item.Location.includes(filters.location)) &&
        (filters.riskLevel === '' || item.RiskLevel === filters.riskLevel)
      );
    });
    setSummaries(filteredSummaries);

    const totalAffected = filteredSummaries.reduce((sum, item) => sum + item.AffectedPeople, 0);
    const totalDisplaced = filteredSummaries.reduce((sum, item) => sum + item.DisplacedPeople, 0);
    const totalHomesLost = filteredSummaries.reduce((sum, item) => sum + item.HomesLost, 0);

    setHumanImpactData({
      affected: totalAffected,
      displaced: totalDisplaced,
      homesLost: totalHomesLost,
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const getEventIcon = (disasterType) => {
    switch (disasterType.toLowerCase()) {
      case 'flood': return '🌊';
      case 'heatwave': return '🌡️';
      case 'cyclone': return '🌪️';
      case 'drought': return '☀️';
      case 'earthquake': return '🏚️';
      case 'landslide': return '⛰️';
      case 'tornado': return '🌪️';
      case 'wildfire': return '🔥';
      case 'tsunami': return '🌊';
      default: return '⚠️';
    }
  };

  return (
    <div className="bg-white text-gray-800 p-4 w-96 h-screen overflow-hidden flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Human Impact</h2>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-red-100 p-3 rounded-lg text-center">
          <Users className="mx-auto text-red-500 mb-1" size={24} />
          <p className="text-xs text-red-700">Affected</p>
          <p className="text-lg font-bold text-red-800">{humanImpactData.affected.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg text-center">
          <Home className="mx-auto text-yellow-500 mb-1" size={24} />
          <p className="text-xs text-yellow-700">Displaced</p>
          <p className="text-lg font-bold text-yellow-800">{humanImpactData.displaced.toLocaleString()}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg text-center">
          <Heart className="mx-auto text-blue-500 mb-1" size={24} />
          <p className="text-xs text-blue-700">Homes Lost</p>
          <p className="text-lg font-bold text-blue-800">{humanImpactData.homesLost.toLocaleString()}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-blue-700">Filters</h3>

      <div className="space-y-3 mb-6">
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <select
          name="disasterType"
          value={filters.disasterType}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
        >
          <option value="">All Disaster Types</option>
          {disasterTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>

        <select
          name="riskLevel"
          value={filters.riskLevel}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
        >
          <option value="">All Risk Levels</option>
          {riskLevels.map((level, index) => (
            <option key={index} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-blue-700">Recent Events</h3>

      <div className="overflow-y-auto flex-grow">
        {summaries.map((event, index) => (
          <div 
            key={index} 
            onClick={() => handleEventClick(event)} 
            className="cursor-pointer p-3 border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="font-bold text-lg flex items-center text-blue-600">
              <span className="mr-2 text-2xl">{getEventIcon(event.DisasterType)}</span>
              <span>{event.DisasterType}</span>
            </div>
            <div className="text-sm">
              <p className="text-gray-600">
                <span className="inline-block mr-2">📍</span>{event.Location}
              </p>
              <p className="text-gray-500">
                <span className="inline-block mr-2">📅</span>{new Date(event.Date).toLocaleDateString('en-US', { month: 'long' })}
              </p>
              <p className="text-blue-500 font-semibold">
                <span className="inline-block mr-2">👥</span>{event.AffectedPeople.toLocaleString()} affected
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h4 className="text-xl font-semibold mb-2 text-blue-700">{selectedEvent.DisasterType} Summary</h4>
            <p className="text-sm text-gray-700 mb-4">{selectedEvent.Summary}</p>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;