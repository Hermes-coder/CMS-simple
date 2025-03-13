import React from 'react';
import PageForm from '../components/PageForm';

const CreatePage = ({ onAddPage }) => {
  return (
    <div className="create-page">
      <PageForm onAddPage={onAddPage} />
    </div>
  );
};

export default CreatePage; 