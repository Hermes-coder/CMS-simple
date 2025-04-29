/* Importa React */
import React from 'react';

/* Importa el componente PageContent que muestra el contenido de una página específica */
import PageContent from '../components/PageContent';

/*
  Componente ViewPage que actúa como contenedor para mostrar el contenido
  de una página individual usando el componente PageContent.
  Recibe `pages` como prop, que es una lista de todas las páginas disponibles.
*/
const ViewPage = ({ pages }) => {
  return (
    <div className="view-page">
      {/* Renderiza el contenido de la página seleccionada */}
      <PageContent pages={pages} />
    </div>
  );
};

/* Exporta el componente ViewPage para su uso en rutas u otros lugares */
export default ViewPage;
