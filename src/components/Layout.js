/* Importa React */
import React from 'react';

/* Importa el componente Sidebar */
import Sidebar from './Sidebar';

/* Importa los estilos del layout */
import './Layout.css';

/* 
  Componente Layout que sirve como estructura general de la aplicación.
  Recibe `children` para renderizar el contenido principal dinámicamente,
  así como `pages` y `onDeletePage` para pasárselos al Sidebar.
*/
const Layout = ({ children, pages, onDeletePage }) => {
  return (
    <div className="layout">
      {/* Componente de la barra lateral con lista de páginas y opción para eliminar */}
      <Sidebar pages={pages} onDeletePage={onDeletePage} />
      
      {/* Contenido principal que puede variar según la página */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

/* Exporta el componente Layout para su uso en otras partes de la app */
export default Layout;
