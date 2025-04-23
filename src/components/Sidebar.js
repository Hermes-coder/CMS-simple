import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeletePage from './DeletePage';
import './Sidebar.css';

const Sidebar = ({ pages, onDeletePage }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => setIsVisible(!isVisible);
  const closeSidebar = () => setIsVisible(false);

  // Detectar tecla ESC para cerrar sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {!isVisible && (
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      )}

      {/* Fondo oscuro al abrir el sidebar */}
      {isVisible && <div className="overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar ${isVisible ? '' : 'hidden'}`}>
        <div className="content-list">
          <h2>Productos</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <Link to={`/page/${page.id}`}>{page.title}</Link>
                <DeletePage pageId={page.id} onDeletePage={onDeletePage} />
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-footer">
          <Link to="/create" className="create-button">Agregar producto</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
