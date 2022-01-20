import React from 'react';
import {
  FoodList,
  Footer,
  Header,
} from '../components';

const Foods = () => (
  <div>
    <Header page="Meals" search />
    <FoodList />
    <Footer />
  </div>
);

export default Foods;
