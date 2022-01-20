import React from 'react';
import {
  Footer,
  Header,
} from '../components';
import DrinksIngredientsExplore from '../components/DrinksIngredientsExplore';

const ExploreDrinksIngredients = () => {
  const pageName = 'Explore by Ingredients';

  return (
    <div>
      <Header page={ pageName } />
      <DrinksIngredientsExplore />
      <Footer />
    </div>
  );
};

export default ExploreDrinksIngredients;
