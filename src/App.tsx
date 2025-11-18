import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DocumentView from './pages/DocumentView';
import { Provider } from './components/ui/provider';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
