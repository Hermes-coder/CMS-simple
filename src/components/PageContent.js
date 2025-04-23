import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PageContent.css'; // Asegúrate de que este archivo esté en el mismo directorio

const PageContent = ({ pages }) => {
  const { id } = useParams();
  const page = pages.find(p => p.id === id);

  const [mainImage, setMainImage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Al cambiar de página, actualizamos las imágenes
    if (page) {
      setMainImage(page.imageUrl);
      setThumbnails(page.thumbnails || []); // Asegurarse que siempre tenga un array
      setCurrentImageIndex(0); // Restablecemos el índice de la imagen a 0
    }
  }, [page]); // Ejecutamos este efecto solo cuando `page` cambie

  if (!page) {
    return (
      <div className="page-not-found">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  const allImages = [page.imageUrl, ...thumbnails, page.additionalThumbnail].filter(Boolean); // Aseguramos que no haya valores nulos

  const changeMainImage = (imageUrl, index) => {
    setMainImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setMainImage(allImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setMainImage(allImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <main>
      <section className="page-content">
        {/* Left side: Image and badge */}
        <section className="image-section">
          <div className="badge">
            <i className="fas fa-star text-black"></i>
            <span>Altamente valorado</span>
          </div>
          <img
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

        {/* Right side: Product details */}
        <section className="details-section">
          <h1 className="product-title">{page.title}</h1>
          <p className="product-price">${page.price}</p>
          <p className="product-description">{page.content}</p>
          
          
          {/* Thumbnails */}
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
      <Link to="/" className="back-link">Volver al inicio</Link>
      <footer className="footer">
        <p>Desarrollado por Magdiel Dominguez Arias</p>
      </footer>

    </main>
    
  );
};

export default PageContent;
