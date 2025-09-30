import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Investor from './pages/Investor';
import Contact from './pages/Contact';
import AGMEGMPage from './pages/AGMEGMPage';
import Disclosure from './pages/Disclosure';
import Policies from './pages/Policies';
import './App.css';
import ScrutinizersReportsPage from './pages/ScrutinizersReportsPage';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Navbar />
        <main>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/investor" element={<Investor />} />
          <Route path="/investor/shareholders-help-desk/agm-egm-notice" element={<AGMEGMPage />} />
          <Route path="/investor/shareholders-help-desk/scrutinizers-reports" element={<ScrutinizersReportsPage />} />
          <Route path="/investor/disclosure" element={<Disclosure />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App; 
