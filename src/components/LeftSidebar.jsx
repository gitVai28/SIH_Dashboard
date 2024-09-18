import React from 'react';

const LeftSidebar = () => {
  // Updated sample JSON data
  const jsonData = [
    {
      "DisasterType": "Flood",
      "Location": "Gujarat",
      "Summary": "Heavy rainfall causes flooding in several districts of Gujarat. Rescue operations underway."
    },
    {
      "DisasterType": "Cyclone",
      "Location": "Odisha",
      "Summary": "Cyclone Yaas makes landfall in Odisha, causing widespread damage to coastal areas."
    },
    {
      "DisasterType": "Earthquake",
      "Location": "Uttarakhand",
      "Summary": "6.2 magnitude earthquake hits Uttarakhand, tremors felt in neighboring states."
    },
    {
      "DisasterType": "Landslide",
      "Location": "Himachal Pradesh",
      "Summary": "Heavy rains trigger landslides in Himachal Pradesh, blocking major highways."
    },
    {
      "DisasterType": "Drought",
      "Location": "Maharashtra",
      "Summary": "Severe drought conditions persist in parts of Maharashtra, affecting agriculture."
    }
  ];

  const sidebarStyle = {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '20px',
    width: '445px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const summaryBoxStyle = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  };

  const summariesContainerStyle = {
    overflowY: 'auto',
    flex: 1,
  };

  const getDisasterTypeColor = (disasterType) => {
    const colors = {
      'Flood': '#4a90e2',
      'Cyclone': '#f5a623',
      'Earthquake': '#d0021b',
      'Landslide': '#7ed321',
      'Drought': '#9013fe'
    };
    return colors[disasterType] || '#000000';
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.5em', color: '#333333' }}>Disaster Summaries</h2>
      
      <div style={summariesContainerStyle}>
        {jsonData.map((item, index) => (
          <div key={index} style={summaryBoxStyle}>
            <p style={{ color: getDisasterTypeColor(item.DisasterType), fontWeight: 'bold' }}>
              {item.DisasterType} - {item.Location}
            </p>
            <p>{item.Summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;