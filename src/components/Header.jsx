import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(() => {
    const now = new Date();
    // Round down to the nearest 15-minute interval
    now.setMinutes(Math.floor(now.getMinutes() / 15) * 15);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  });

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Update "Last Updated" every 15 minutes
    const updateLastUpdated = () => {
      const now = new Date();
      if (now.getMinutes() % 15 === 0 && now.getSeconds() === 0) {
        setLastUpdated(now);
      }
    };

    const updateTimer = setInterval(updateLastUpdated, 1000);

    // Clean up timers when the component is unmounted
    return () => {
      clearInterval(timer);
      clearInterval(updateTimer);
    };
  }, []);

  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format time as h:mm:ss am/pm
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  return (
    <div className="p-4 bg-blue-600 text-white">
      <div className="flex justify-between items-center">
        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/archive" className="text-white hover:underline">Archive</Link>
          <Link to="/reports" className="text-white hover:underline">Time Series Analysis</Link>
          <Link to="/predictions" className="text-white hover:underline">Predictions</Link>
        </nav>

        {/* Title and Subtitle */}
        <div className="text-center flex-grow">
          <h1 className="text-3xl font-bold">U.M.E.E.D.</h1>
          <h2 className="text-sm italic">Unified Monitoring of Emergency Events and Disasters</h2>
        </div>
        
        {/* Date and Time */}
        <div className="text-sm">
          <span>{formatDate(currentDateTime)}</span>
          <span className="mx-4">{formatTime(currentDateTime)}</span>
          <span>Last Updated: {formatTime(lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;