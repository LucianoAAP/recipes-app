import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getDrink } from '../../services/drinkAPI';
import { getMealsForRecommendation } from '../../services/foodAPI';
import { doesItExist, createIngredients } from '../../utils';
import {
  // DRINK_ERROR_RESPONSE,
  NEW_DRINK_SEARCH,
  DRINK_RESPONSE } from '../../redux/reducers/drinkReducer';
import Ingredients from '../Ingredients';
import Recommendations from '../Recommendations';
import StartRecipe from '../StartRecipe';
import DetailsButtonsField from '../DetailsButtonsField';
import Loading from '../Loading';
import './style.css';

const DrinkDetails = () => {
  const loading = useSelector(({ drink }) => drink.loading);
  const drinks = useSelector(({ drink }) => drink.drinks);
  const error = useSelector(({ drink }) => drink.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const maxIngredients = 15;

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await getMealsForRecommendation();
      setRecommendations(response);
    };
    const fetchDrink = async () => {
      // try {
      dispatch({ type: NEW_DRINK_SEARCH });
      const response = await getDrink(id, 'id');
      const getIngredients = createIngredients(response, maxIngredients);
      await setIngredients(getIngredients);
      await fetchMeals();
      dispatch({ type: DRINK_RESPONSE, payload: response });
      // } catch (error) {
      //   console.log(error);
      //   dispatch({ type: DRINK_ERROR_RESPONSE });
      // }
    };
    fetchDrink();
  }, [id, dispatch]);

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic } = drinks[0];
    const oldFavorites = doesItExist(favoriteRecipes);
    if (!oldFavorites.some((recipe) => recipe.id === idDrink)) {
      const newFavorites = [
        ...oldFavorites,
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorites = oldFavorites.filter((recipe) => recipe.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drinks[0];

  return (
    <div className="recipe-details">
      <h3 className="recipe-title" data-testid="recipe-title">{ strDrink }</h3>
      <img
        className="recipe-photo"
        src={ strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <br />
      <DetailsButtonsField recipeType="bebidas" handleFavorite={ handleFavorite } />
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <Ingredients max={ maxIngredients } page="details" />
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <Recommendations recommendations={ recommendations } />
      <StartRecipe recipeType="cocktails" ingredients={ ingredients } />
    </div>
  );
};

export default DrinkDetails;
