// src/components/DeletePage.js
import React from 'react';

const DeletePage = ({ pageId, onDeletePage }) => {
  const handleDelete = () => {
    onDeletePage(pageId); // Llamamos la función para eliminar la página
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Eliminar
    </button>
  );
};

export default DeletePage;
