import React, { useState, useEffect } from 'react';
import { getDrinkIngredients } from '../../services/drinkAPI';
import ExploreByIngredientsCard from '../ExploreByIngredientsCard';

const DrinksIngredientsExplore = () => {
  const [ingredients, setIngredients] = useState([]);
  const maxIngredients = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getDrinkIngredients();
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
            tag="cocktail"
            index={ index }
          />)) }
    </div>
  );
};

export default DrinksIngredientsExplore;
