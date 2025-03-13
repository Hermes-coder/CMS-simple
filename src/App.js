import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ViewPage from './pages/ViewPage';
import initialPages from './data/pages.json';
import './App.css';

function App() {
  const [pages, setPages] = useState(() => {
    // Intentar cargar las páginas desde localStorage
    const savedPages = localStorage.getItem('cms-pages');
    return savedPages ? JSON.parse(savedPages) : initialPages;
  });

  // Guardar las páginas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('cms-pages', JSON.stringify(pages));
  }, [pages]);

  // Función para agregar una nueva página
  const handleAddPage = (newPage) => {
    setPages([...pages, newPage]);
  };

  return (
    <Router>
      <div className="app">
        <Layout pages={pages}>
          <Routes>
            <Route path="/" element={<HomePage pages={pages} />} />
            <Route path="/create" element={<CreatePage onAddPage={handleAddPage} />} />
            <Route path="/page/:id" element={<ViewPage pages={pages} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
