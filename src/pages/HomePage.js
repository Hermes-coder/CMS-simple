// Importa React para usar JSX
import React from 'react';

// Importa Link de react-router-dom para navegación entre páginas sin recargar
import { Link } from 'react-router-dom';

// Importa los estilos CSS específicos para esta página
import './HomePage.css';

// Define el componente funcional HomePage que recibe 'pages' como prop
const HomePage = ({ pages }) => {

  // Crea una copia de 'pages' y las ordena por fecha de creación (más recientes primero)
  const sortedPages = [...pages].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Función para formatear una fecha a un formato legible en español
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="home-page">
      {/* Sección de bienvenida */}
      <div className="welcome-section">
        <h1>Bienvenido a Magdiel Sportbikes </h1>
        <p>"Potencia, velocidad y estilo, todo en un solo lugar".</p>
        {/* Botón que lleva a la ruta para crear una nueva motocicleta */}
        <Link to="/create" className="create-page-button">
          Agrega motocicletas
        </Link>
      </div>

      {/* Sección de motocicletas recientes */}
      <div className="recent-pages">
        <h2>Motocicletas recién agregadas</h2>

        {/* Si hay motocicletas disponibles */}
        {sortedPages.length > 0 ? (
          <div className="pages-grid">
            {/* Recorre cada página/motocicleta y muestra una tarjeta */}
            {sortedPages.map(page => (
              <div key={page.id} className="page-card">
                
                {/* Muestra la imagen de la motocicleta si existe */}
                {page.imageUrl && (
                  <div className="page-image">
                    <img src={page.imageUrl} alt={page.title} />
                  </div>
                )}

                {/* Título de la motocicleta, enlazado a su página individual */}
                <h3>
                  <Link to={`/page/${page.id}`}>{page.title}</Link>
                </h3>

                {/* Fecha de creación formateada */}
                <div className="page-date">
                  Creado: {formatDate(page.createdAt)}
                </div>

                {/* Muestra un extracto del contenido (máx. 150 caracteres) */}
                <p className="page-excerpt">
                  {page.content.length > 150 
                    ? `${page.content.substring(0, 150)}...` 
                    : page.content}
                </p>

                {/* Enlace para leer más detalles de la motocicleta */}
                <Link to={`/page/${page.id}`} className="read-more">
                  Leer más
                </Link>
              </div>
            ))}
          </div>
        ) : (
          // Mensaje en caso de que no haya motocicletas agregadas
          <p className="no-pages">No hay motocicletas en stock. ¡Agrega la primera!</p>
        )}
      </div>

      {/* Créditos del desarrollador */}
      <div className="developer-credit">
        <small>Proyecto desarrollado por Magdiel Domínguez Arias</small>
      </div>
    </div>
  );
};

// Exporta el componente para poder usarlo en otras partes de la aplicación
export default HomePage;
