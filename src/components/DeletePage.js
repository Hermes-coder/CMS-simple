// src/components/DeletePage.js
import React from 'react';

// Componente funcional que permite eliminar una página
const DeletePage = ({ pageId, onDeletePage }) => {
  // Función que maneja el evento de eliminar
  const handleDelete = () => {
    // Llama a la función onDeletePage pasando el ID de la página a eliminar
    onDeletePage(pageId);
  };

  return (
    // Renderiza un botón con una clase para estilos
    // Al hacer clic, ejecuta handleDelete
    <button onClick={handleDelete} className="delete-button">
      Eliminar
    </button>
  );
};

// Exporta el componente para que pueda ser importado en otros archivos
export default DeletePage;
