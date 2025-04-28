import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './PageForm.css';

const PageForm = ({ onAddPage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [features, setFeatures] = useState(['']); // Características
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [imageUrl, setImageUrl] = useState('');
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const [additionalThumbnail, setAdditionalThumbnail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !imageUrl.trim() || thumbnailUrls.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const formattedPrice = `${currency} ${parseFloat(price).toLocaleString()}`;

    const newPage = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      features: features.filter(f => f.trim() !== ''),
      price: formattedPrice,
      imageUrl: imageUrl.trim(),
      thumbnails: thumbnailUrls,
      additionalThumbnail: additionalThumbnail.trim(),
      createdAt: new Date().toISOString()
    };

    onAddPage(newPage);
    navigate(`/page/${newPage.id}`);
  };

  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setThumbnailUrls(urls);
  };

  const handleAdditionalThumbnailChange = (e) => {
    const file = e.target.files[0];
    setAdditionalThumbnail(URL.createObjectURL(file));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const addFeatureField = () => {
    setFeatures([...features, '']);
  };

  return (
    <div className="page-form-container">
      <h2>Crear Nueva Motocicleta</h2>
      <form onSubmit={handleSubmit} className="page-form">
        <div className="form-group">
          <label htmlFor="title">Nombre del Modelo:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ejemplo: Ninja ZX-10R"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Descripción:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe las emociones y rendimiento de esta máquina."
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label>Características Destacadas:</label>
          {features.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder="Ej: Motor de 998 cc, 231 hp@11,500rpm"
              className="feature-input"
            />
          ))}
          <button type="button" onClick={addFeatureField} className="add-feature-button">
            + Añadir característica
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Imagen Principal:</label>
          <input
            type="file"
            id="imageUrl"
            onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnails">Galería de Imágenes:</label>
          <input
            type="file"
            id="thumbnails"
            multiple
            onChange={handleThumbnailChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="additionalThumbnail">Imagen Adicional:</label>
          <input
            type="file"
            id="additionalThumbnail"
            onChange={handleAdditionalThumbnailChange}
            accept="image/*"
          />
        </div>

        <div className="form-group price-group">
          <div>
            <label htmlFor="currency">Moneda:</label>
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div>
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ejemplo: 25000"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Publicar Moto
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;
