// Importa React y hooks necesarios
import React, { useState } from 'react';
// Hook para navegación programática
import { useNavigate } from 'react-router-dom';
// Importa uuid para generar identificadores únicos
import { v4 as uuidv4 } from 'uuid';
// Importa los estilos del formulario
import './PageForm.css';

// Componente PageForm para crear una nueva página/producto
const PageForm = ({ onAddPage }) => {
  // Estado para el título del producto
  const [title, setTitle] = useState('');
  // Estado para el contenido o descripción del producto
  const [content, setContent] = useState('');
  // Estado para las características destacadas (lista de strings)
  const [features, setFeatures] = useState(['']);
  // Estado para el precio
  const [price, setPrice] = useState('');
  // Estado para la moneda seleccionada
  const [currency, setCurrency] = useState('USD');
  // Estado para la URL de la imagen principal
  const [imageUrl, setImageUrl] = useState('');
  // Estado para URLs de las imágenes en miniatura (galería)
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  // Estado para una imagen adicional
  const [additionalThumbnail, setAdditionalThumbnail] = useState('');
  // Hook de navegación para redirigir después de crear la página
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: todos los campos deben estar llenos
    if (!title.trim() || !content.trim() || !imageUrl.trim() || thumbnailUrls.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Formatea el precio incluyendo la moneda
    const formattedPrice = `${currency} ${parseFloat(price).toLocaleString()}`;

    // Crea un nuevo objeto de página/producto
    const newPage = {
      id: uuidv4(), // Genera un ID único
      title: title.trim(),
      content: content.trim(),
      features: features.filter(f => f.trim() !== ''), // Elimina características vacías
      price: formattedPrice,
      imageUrl: imageUrl.trim(),
      thumbnails: thumbnailUrls,
      additionalThumbnail: additionalThumbnail.trim(),
      createdAt: new Date().toISOString() // Fecha de creación
    };

    // Llama a la función prop para agregar la nueva página
    onAddPage(newPage);
    // Redirige a la nueva página creada
    navigate(`/page/${newPage.id}`);
  };

  // Maneja el cambio de imágenes en miniatura (galería)
  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setThumbnailUrls(urls);
  };

  // Maneja el cambio de la imagen adicional
  const handleAdditionalThumbnailChange = (e) => {
    const file = e.target.files[0];
    setAdditionalThumbnail(URL.createObjectURL(file));
  };

  // Maneja el cambio de características destacadas
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // Agrega un nuevo campo de característica
  const addFeatureField = () => {
    setFeatures([...features, '']);
  };

  // Renderizado del formulario
  return (
    <div className="page-form-container">
      <h2>Crear Nueva Motocicleta</h2>
      <form onSubmit={handleSubmit} className="page-form">
        {/* Campo de entrada para el título */}
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

        {/* Campo de entrada para la descripción */}
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

        {/* Características destacadas dinámicas */}
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
          {/* Botón para agregar una nueva característica */}
          <button type="button" onClick={addFeatureField} className="add-feature-button">
            + Añadir característica
          </button>
        </div>

        {/* Campo de subida de imagen principal */}
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

        {/* Campo de subida de galería de imágenes */}
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

        {/* Campo de subida para imagen adicional */}
        <div className="form-group">
          <label htmlFor="additionalThumbnail">Imagen Adicional:</label>
          <input
            type="file"
            id="additionalThumbnail"
            onChange={handleAdditionalThumbnailChange}
            accept="image/*"
          />
        </div>

        {/* Grupo para seleccionar moneda y precio */}
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

        {/* Botones de acción del formulario */}
        <div className="form-actions">
          {/* Botón para cancelar y volver al inicio */}
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancelar
          </button>
          {/* Botón para enviar el formulario */}
          <button type="submit" className="submit-button">
            Publicar Moto
          </button>
        </div>
      </form>
    </div>
  );
};

// Exporta el componente PageForm
export default PageForm;

