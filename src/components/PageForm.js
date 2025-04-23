import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './PageForm.css';

const PageForm = ({ onAddPage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Imagen principal
  const [thumbnailUrls, setThumbnailUrls] = useState([]); // Imágenes pequeñas
  const [additionalThumbnail, setAdditionalThumbnail] = useState(''); // Nueva imagen pequeña adicional
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !imageUrl.trim() || thumbnailUrls.length === 0) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const newPage = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      price: parseFloat(price.trim()), 
      imageUrl: imageUrl.trim(), 
      thumbnails: thumbnailUrls, // Guardamos las miniaturas
      additionalThumbnail: additionalThumbnail.trim(), // Guardamos la nueva imagen pequeña adicional
      createdAt: new Date().toISOString()
    };

    onAddPage(newPage);
    navigate(`/page/${newPage.id}`);
  };

  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setThumbnailUrls(urls); // Convertimos las imágenes a URL y las guardamos en el estado
  };

  const handleAdditionalThumbnailChange = (e) => {
    const file = e.target.files[0];
    setAdditionalThumbnail(URL.createObjectURL(file)); // Guardamos la nueva imagen pequeña adicional
  };

  return (
    <div className="page-form-container">
      <h2>Crear Nueva Página</h2>
      <form onSubmit={handleSubmit} className="page-form">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa el título de la página"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ingresa el contenido de la página"
            rows="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Imagen Principal:</label>
          <input
            type="file"
            id="imageUrl"
            onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnails">Imagen:</label>
          <input
            type="file"
            id="thumbnails"
            multiple
            onChange={handleThumbnailChange}
            accept="image/*"
            required
          />
        </div>

        {/* Nueva sección para imagen pequeña adicional */}
        <div className="form-group">
          <label htmlFor="additionalThumbnail">Imagen:</label>
          <input
            type="file"
            id="additionalThumbnail"
            onChange={handleAdditionalThumbnailChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingresa el precio"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Crear Página
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;
