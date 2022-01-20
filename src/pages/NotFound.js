import React from 'react';
import {
  Footer,
  Header,
  NotFoundComponent,
} from '../components';

const NotFound = () => (
  <>
    <Header page="Error" search />
    <NotFoundComponent />
    <Footer />
  </>
);

export default NotFound;
