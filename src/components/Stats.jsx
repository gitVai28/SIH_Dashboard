import React, { useState, useEffect } from 'react';
import '../style/stats.css';

const Stats = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [statsData, setStatsData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulated data for Indian states (same as before)
  const allStatesData = [
    [
      { value: "50", label: "Maharashtra" },
      { value: "48", label: "Kerala" },
      { value: "93", label: "Gujarat" },
      { value: "41", label: "Rajasthan" },
      { value: "41", label: "Punjab" }
    ],
    [
      { value: "62", label: "Uttar Pradesh" },
      { value: "35", label: "Tamil Nadu" },
      { value: "29", label: "Karnataka" },
      { value: "32", label: "West Bengal" },
      { value: "72", label: "Bihar" }
    ],
    [
      { value: "43", label: "Madhya Pradesh" },
      { value: "27", label: "Andhra Pradesh" },
      { value: "19", label: "Odisha" },
      { value: "34", label: "Telangana" },
      { value: "12", label: "Assam" }
    ],
    // Remaining states
    [
      { value: "56", label: "Chhattisgarh" },
      { value: "98", label: "Goa" },
      { value: "65", label: "Haryana" },
      { value: "32", label: "Himachal Pradesh" },
      { value: "78", label: "Jharkhand" }
    ],
    [
      { value: "34", label: "Arunachal Pradesh" },
      { value: "89", label: "Manipur" },
      { value: "60", label: "Meghalaya" },
      { value: "21", label: "Mizoram" },
      { value: "79", label: "Nagaland" }
    ],
    [
      { value: "19", label: "Sikkim" },
      { value: "45", label: "Tripura" },
      { value: "87", label: "Uttarakhand" }
    ]
  ];
  

  useEffect(() => {
    const updateStats = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStateIndex((prevIndex) => (prevIndex + 1) % allStatesData.length);
        setStatsData(allStatesData[(currentStateIndex + 1) % allStatesData.length]);
        setIsAnimating(false);
      }, 500); // Half of the transition duration
    };

    setStatsData(allStatesData[currentStateIndex]);
    const interval = setInterval(updateStats, 10000); // 30 seconds

    return () => clearInterval(interval);
  }, [currentStateIndex]);

  return (
    <div className="statistics">
      {statsData.map((stat, index) => (
        <div className={`stat-item ${isAnimating ? 'animating' : ''}`} key={index}>
          <div className="circle">
            <div className={`radar-sweep delay-${index + 1}`}></div>
          </div>
          <div className="data">
            <div>{stat.value}</div>
            <div>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;