import React from 'react';
import { number, shape, string } from 'prop-types';

const ExploreByIngredientsCard = ({ ingredient, tag, index }) => {
  const converter = tag === 'cocktail' ? '1' : '';
  const key = `strIngredient${converter}`;
  const ingredientName = ingredient[key];
  const imgSrc = `https://www.the${tag}db.com/images/ingredients/${ingredientName}-Small.png`;
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img src={ imgSrc } alt={ ingredientName } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{ ingredientName }</p>
    </div>
  );
};

ExploreByIngredientsCard.propTypes = {
  ingredient: shape({}).isRequired,
  tag: string.isRequired,
  index: number.isRequired,
};

export default ExploreByIngredientsCard;
