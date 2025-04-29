// Importaciones necesarias desde React y otras bibliotecas
import React, { useEffect, useState } from 'react'; // React y hooks: useEffect para efectos secundarios, useState para manejar estado local
import { Link } from 'react-router-dom'; // Componente Link para navegación sin recargar la página
import DeletePage from './DeletePage'; // Componente para eliminar una página (producto)
import './Sidebar.css'; // Estilos CSS específicos del componente Sidebar

// Componente funcional Sidebar
const Sidebar = ({ pages, onDeletePage }) => {
  // Estado para controlar la visibilidad del sidebar (true = visible, false = oculto)
  const [isVisible, setIsVisible] = useState(false);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => setIsVisible(!isVisible);

  // Función para cerrar el sidebar (establece visibilidad en false)
  const closeSidebar = () => setIsVisible(false);

  // Hook useEffect que añade un listener para cerrar el sidebar al presionar la tecla Escape
  useEffect(() => {
    // Función que maneja el evento de presionar una tecla
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSidebar(); // Si se presiona Escape, cerrar sidebar
      }
    };

    // Agregar evento al presionar una tecla
    document.addEventListener('keydown', handleKeyDown);

    // Limpiar el evento al desmontar el componente
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []); // Se ejecuta solo al montar el componente

  return (
    <>
      {/* Botón hamburguesa para abrir el sidebar cuando está oculto */}
      {!isVisible && (
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
          {/* Ícono de barras del sidebar (usando FontAwesome) */}
          <i className="fas fa-bars"></i>
        </button>
      )}

      {/* Fondo oscuro que aparece detrás del sidebar cuando está visible */}
      {isVisible && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Contenedor principal del sidebar, oculto si no está visible */}
      <div className={`sidebar ${isVisible ? '' : 'hidden'}`}>
        <div className="content-list">
          <h2>Productos</h2>
          <ul>
            {/* Mapeo de las páginas/productos para listarlos */}
            {pages.map((page) => (
              <li key={page.id}>
                {/* Enlace al detalle de cada producto */}
                <Link to={`/page/${page.id}`}>{page.title}</Link>
                {/* Botón para eliminar el producto */}
                <DeletePage pageId={page.id} onDeletePage={onDeletePage} />
              </li>
            ))}
          </ul>
        </div>

        {/* Pie de página del sidebar con botón para agregar un nuevo producto */}
        <div className="sidebar-footer">
          <Link to="/create" className="create-button">Agregar producto</Link>
        </div>
      </div>
    </>
  );
};

// Exportar Sidebar para poder usarlo en otros componentes
export default Sidebar;

