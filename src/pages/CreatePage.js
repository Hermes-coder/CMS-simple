// Importa React para poder usar JSX
import React from 'react';

// Importa el componente PageForm que será usado dentro de CreatePage
import PageForm from '../components/PageForm';

// Define el componente funcional CreatePage
// Recibe como prop onAddPage, una función que se usará para agregar una nueva página
const CreatePage = ({ onAddPage }) => {
  return (
    // Contenedor con clase CSS "create-page" para estilos específicos
    <div className="create-page">
      {/* Renderiza el componente PageForm, pasándole la función onAddPage como prop */}
      <PageForm onAddPage={onAddPage} />
    </div>
  );
};

// Exporta el componente CreatePage para usarlo en otras partes de la aplicación
export default CreatePage;
