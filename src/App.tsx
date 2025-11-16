import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Dashboard from './pages/Dashboard';
import DocumentView from './pages/DocumentView';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
