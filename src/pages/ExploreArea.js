import React from 'react';
import {
  ExploreAreaComponent,
  Footer,
  Header,
} from '../components';

const ExploreArea = () => {
  const pageName = 'Explore by Origin';
  return (
    <div>
      <Header page={ pageName } search />
      <ExploreAreaComponent />
      <Footer />
    </div>
  );
};

export default ExploreArea;
