import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Shows } from './pages/Shows';
import { Anime } from './pages/Anime';
import { Settings } from './pages/Settings';
import { Watch } from './pages/Watch';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;