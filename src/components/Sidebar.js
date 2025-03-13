import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ pages }) => {
  return (
    <div className="sidebar">
      <h2>Tabla de Contenidos</h2>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <Link to={`/page/${page.id}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <Link to="/create" className="create-button">Crear Nueva Página</Link>
      </div>
    </div>
  );
};

export default Sidebar; 