import React from 'react';
import {
  Footer,
  Header,
} from '../components';
import MealsIngredientsExplore from '../components/MealsIngredientsExplore';

const ExploreFoodsIngredients = () => {
  const pageName = 'Explore by Ingredients';
  return (
    <div>
      <Header page={ pageName } />
      <MealsIngredientsExplore />
      <Footer />
    </div>
  );
};

export default ExploreFoodsIngredients;
