import React, { useState, useEffect } from 'react';
import { getFoodIngredients } from '../../services/foodAPI';
import ExploreByIngredientsCard from '../ExploreByIngredientsCard';

const MealsIngredientsExplore = () => {
  const [ingredients, setIngredients] = useState([]);
  const maxIngredients = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getFoodIngredients();
      const filteredResponse = response
        .filter((_ingredient, num) => num < maxIngredients);
      setIngredients(filteredResponse);
    };
    fetchIngredients();
  }, []);

  return (
    <div>
      { ingredients.map((ingredient, index) => (
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
