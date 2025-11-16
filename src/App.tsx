import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DocumentView from './pages/DocumentView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
