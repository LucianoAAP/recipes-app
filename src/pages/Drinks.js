import React from 'react';
import {
  DrinkList,
  Footer,
  Header,
} from '../components';

const Drinks = () => (
  <div>
    <Header page="Drinks" search />
    <DrinkList />
    <Footer />
  </div>
);

export default Drinks;
