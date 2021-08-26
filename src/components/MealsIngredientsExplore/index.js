import React, { useState, useEffect } from 'react';
import { getFoodIngredients } from '../../services/foodAPI';
import ExploreByIngredientsCard from '../ExploreByIngredientsCard';

const MealsIngredientsExplore = () => {
  const [ingredients, setIngredients] = useState([]);
  const maxIngredients = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getFoodIngredients();
      setIngredients(response);
    };
    fetchIngredients();
  });

  return (
    <div>
      { ingredients.filter((_gerIngredient, num) => num < maxIngredients)
        .map((ingredient, index) => (
          <ExploreByIngredientsCard
            key={ `ingredient-${index}` }
            ingredient={ ingredient }
            tag="meal"
            index={ index }
          />)) }
    </div>
  );
};

export default MealsIngredientsExplore;
