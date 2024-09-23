import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Import all components
import Header from './components/Header';
import Stats from './components/Stats';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MainContent from './components/MainContent';
import DynamicDataVisualization from './components/DynamicDataVisualization';
import PredictiveAnalysis from './components/PredictiveAnalysis';
import DisasterReport from './components/DisasterReport';

// Dashboard component
function Dashboard() {
  return (
    <>
      <section className="statistics">
        <Stats />
      </section>
      <aside className="sidebar-left">
        <LeftSidebar />
      </aside>
      <main>
        <section className="content">
          <MainContent />
        </section>
      </main>
      <aside className="sidebar-right">
        <RightSidebar />
      </aside>
    </>
  );
}

// Archive component
function Archive() {
  return (
    <div>
      <DynamicDataVisualization />
    </div>
  );
}

// Reports component
function Reports() {
  return (
    <div>
      
      <DisasterReport/>
    </div>
  );
}

// Predictions component
function Predictions() {
  return (
    <div>
      
      <PredictiveAnalysis />
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <Routes>
        {/* Route for the Dashboard with container styling */}
        <Route path="/" element={<div className="container"><Dashboard /></div>} />

        {/* Routes for Archive and Reports without container styling */}
        <Route path="/archive" element={<Archive />} />
        <Route path="/reports" element={<Reports />} />
        
        {/* New route for Predictions */}
        <Route path="/predictions" element={<Predictions />} />

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
