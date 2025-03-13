import React from 'react';
import PageContent from '../components/PageContent';

const ViewPage = ({ pages }) => {
  return (
    <div className="view-page">
      <PageContent pages={pages} />
    </div>
  );
};

export default ViewPage; 