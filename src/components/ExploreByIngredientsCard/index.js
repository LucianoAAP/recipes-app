import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { number, shape, string } from 'prop-types';
import { FOOD_PARAMETER_REDIRECT } from '../../redux/reducers/foodReducer';
import { DRINK_PARAMETER_REDIRECT } from '../../redux/reducers/drinkReducer';

const ExploreByIngredientsCard = ({ ingredient, tag, index }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const converter = tag === 'cocktail' ? '1' : '';
  const key = `strIngredient${converter}`;
  const ingredientName = ingredient[key];
  const imgSrc = `https://www.the${tag}db.com/images/ingredients/${ingredientName}-Small.png`;

  const handleRedirect = () => {
    dispatch({
      type: tag === 'cocktail' ? DRINK_PARAMETER_REDIRECT : FOOD_PARAMETER_REDIRECT,
      payload: { parameter: 'ingredient', term: ingredientName },
    });
    history.push({
      pathname: tag === 'cocktail' ? '/bebidas' : '/comidas',
    });
  };

  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleRedirect }
      aria-hidden="true"
    >
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
