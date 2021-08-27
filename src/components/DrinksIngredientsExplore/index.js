import React, { useState, useEffect } from 'react';
import { getDrinkIngredients } from '../../services/drinkAPI';
import ExploreByIngredientsCard from '../ExploreByIngredientsCard';

const DrinksIngredientsExplore = () => {
  const [ingredients, setIngredients] = useState([]);
  const maxIngredients = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getDrinkIngredients();
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
          tag="cocktail"
          index={ index }
        />)) }
    </div>
  );
};

export default DrinksIngredientsExplore;
