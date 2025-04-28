import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PageContent.css';

const PageContent = ({ pages }) => {
  const { id } = useParams();
  const page = pages.find(p => p.id === id);

  const [mainImage, setMainImage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageRef = useRef(null);

  useEffect(() => {
    if (page) {
      setMainImage(page.imageUrl);
      setThumbnails(page.thumbnails || []);
      setCurrentImageIndex(0);
    }
  }, [page]);

  if (!page) {
    return (
      <div className="page-not-found">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  const allImages = [page.imageUrl, ...thumbnails, page.additionalThumbnail].filter(Boolean);

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

  const handleMouseMove = (e) => {
    const img = imageRef.current;
    const controls = document.querySelector('.image-controls');

    if (img && controls) {
      const controlsRect = controls.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (
        mouseX > controlsRect.left &&
        mouseX < controlsRect.right &&
        mouseY > controlsRect.top &&
        mouseY < controlsRect.bottom
      ) {
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
        return; // No aplicar zoom sobre los botones
      }

      const { left, top, width, height } = img.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = 'scale(2.2)';
    }
  };

  const handleMouseLeave = () => {
    const img = imageRef.current;
    if (img) {
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    }
  };

  return (
    <main>
      <section className="page-content">
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

        <section className="details-section">
          <h1 className="product-title">{page.title}</h1>
          <p className="product-price">${page.price.toLocaleString()}</p>
          <p className="product-description">{page.content}</p>

          {page.characteristics && (
            <ul className="characteristics-list">
              {page.characteristics.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {/* Características Destacadas */}
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
        <p>Desarrollado por Magdiel Domínguez Arias</p>
      </footer>
    </main>
  );
};

export default PageContent;
