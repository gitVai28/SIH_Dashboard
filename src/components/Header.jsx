import React, { useState, useEffect } from "react";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const temperature = "30°C";

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Format date as DD/M/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString(); // getMonth() returns 0-11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format time as H:MM:SS am/pm
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    }).toLowerCase();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-3xl font-bold">Disaster Dashboard</h1>
      <div className="text-sm">
        {formatDate(currentDateTime)}
        <span className="mx-4">{formatTime(currentDateTime)}</span>
        <span>Temp: {temperature}</span>
      </div>
    </div>
  );
};

export default Header;