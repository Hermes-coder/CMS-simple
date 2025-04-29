import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PageContent.css';

/* Componente PageContent que muestra los detalles de una página específica */
const PageContent = ({ pages }) => {
  /* Extrae el parámetro de la URL */
  const { id } = useParams();

  /* Busca la página correspondiente en el array `pages` */
  const page = pages.find(p => p.id === id);

  /* Estados para manejar la imagen principal, miniaturas y el índice de la imagen actual */
  const [mainImage, setMainImage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* Referencia al elemento de imagen principal */
  const imageRef = useRef(null);

  /* Efecto que se ejecuta al montar el componente o cuando cambia `page` */
  useEffect(() => {
    if (page) {
      setMainImage(page.imageUrl); // Imagen principal
      setThumbnails(page.thumbnails || []); // Miniaturas (si existen)
      setCurrentImageIndex(0); // Reinicia el índice
    }
  }, [page]);

  /* Si la página no existe, muestra un mensaje de error */
  if (!page) {
    return (
      <div className="page-not-found">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  /* Crea un array con todas las imágenes (principal, miniaturas y adicional) */
  const allImages = [page.imageUrl, ...thumbnails, page.additionalThumbnail].filter(Boolean);

  /* Cambia la imagen principal y actualiza el índice */
  const changeMainImage = (imageUrl, index) => {
    setMainImage(imageUrl);
    setCurrentImageIndex(index);
  };

  /* Avanza a la siguiente imagen */
  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setMainImage(allImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  /* Retrocede a la imagen anterior */
  const goToPreviousImage = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setMainImage(allImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  /* Maneja el zoom dinámico cuando se mueve el mouse sobre la imagen */
  const handleMouseMove = (e) => {
    const img = imageRef.current;
    const controls = document.querySelector('.image-controls');

    if (img && controls) {
      const controlsRect = controls.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      /* Si el mouse está sobre los botones de navegación, desactiva el zoom */
      if (
        mouseX > controlsRect.left &&
        mouseX < controlsRect.right &&
        mouseY > controlsRect.top &&
        mouseY < controlsRect.bottom
      ) {
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
        return;
      }

      /* Calcula el origen del zoom basado en la posición del cursor */
      const { left, top, width, height } = img.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = 'scale(2.2)';
    }
  };

  /* Restaura el zoom cuando el mouse sale de la imagen */
  const handleMouseLeave = () => {
    const img = imageRef.current;
    if (img) {
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    }
  };

  /* Renderizado del componente */
  return (
    <main>
      <section className="page-content">
        {/* Sección de imagen con zoom y controles */}
        <section
          className="image-section"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="badge">
            <i className="fas fa-motorcycle"></i>
            <span>Top Performance</span>
          </div>
          <img
            ref={imageRef}
            alt={page.title}
            className="main-image"
            src={mainImage}
          />
          <div className="image-controls">
            <button aria-label="Previous image" className="control-button" onClick={goToPreviousImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button aria-label="Next image" className="control-button" onClick={goToNextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Sección de detalles del producto */}
        <section className="details-section">
          <h1 className="product-title">{page.title}</h1>
          <p className="product-price">${page.price.toLocaleString()}</p>
          <p className="product-description">{page.content}</p>

          {/* Lista de características si existen */}
          {page.characteristics && (
            <ul className="characteristics-list">
              {page.characteristics.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}

          {/* Características principales si existen */}
          {page.features && page.features.length > 0 && (
            <div className="features-list">
              <h3>Características Principales:</h3>
              <ul>
                {page.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Miniaturas para cambiar de imagen */}
          <div className="thumbnails">
            {allImages.map((thumbnail, index) => (
              <button
                key={index}
                className="thumbnail-button"
                onClick={() => changeMainImage(thumbnail, index)}
              >
                <img
                  alt={`Thumbnail ${index}`}
                  className="thumbnail"
                  src={thumbnail}
                />
              </button>
            ))}
          </div>
        </section>
      </section>

      {/* Enlace de regreso al inicio */}
      <Link to="/" className="back-link">Volver al inicio</Link>

      {/* Pie de página */}
      <footer className="footer">
        <p>Desarrollado por Magdiel Domínguez Arias</p>
      </footer>
    </main>
  );
};

export default PageContent;
