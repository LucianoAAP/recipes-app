import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getFood } from '../../services/foodAPI';
import { getDrinksForRecommendation } from '../../services/drinkAPI';
import { doesItExist, createIngredients } from '../../utils';
import {
  // FOOD_ERROR_RESPONSE,
  NEW_FOOD_SEARCH,
  FOOD_RESPONSE } from '../../redux/reducers/foodReducer';
import Ingredients from '../Ingredients';
import Recommendations from '../Recommendations';
import StartRecipe from '../StartRecipe';
import DetailsButtonsField from '../DetailsButtonsField';
import Loading from '../Loading';
import './style.css';

const MealDetails = () => {
  const loading = useSelector(({ food }) => food.loading);
  const meals = useSelector(({ food }) => food.meals);
  const error = useSelector(({ food }) => food.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const maxIngredients = 20;

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await getDrinksForRecommendation();
      setRecommendations(response);
    };
    const fetchFood = async () => {
      // try {
      dispatch({ type: NEW_FOOD_SEARCH });
      const response = await getFood(id, 'id');
      const getIngredients = createIngredients(response, maxIngredients);
      await setIngredients(getIngredients);
      await fetchDrinks();
      dispatch({ type: FOOD_RESPONSE, payload: response });
      // } catch (error) {
      //   console.log(error);
      //   dispatch({ type: FOOD_ERROR_RESPONSE });
      // }
    };
    fetchFood();
  }, [id, dispatch]);

  const handleFavorite = () => {
    const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meals[0];
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const oldFavorites = doesItExist(favoriteRecipes);
    if (!oldFavorites.some((recipe) => recipe.id === idMeal)) {
      const newFavorites = [
        ...oldFavorites,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorites = oldFavorites.filter((recipe) => recipe.id !== idMeal);
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

  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube } = meals[0];

  return (
    <div className="recipe-details">
      <h3 className="recipe-title" data-testid="recipe-title">{ strMeal }</h3>
      <img
        className="recipe-photo"
        src={ strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <br />
      <DetailsButtonsField recipeType="comidas" handleFavorite={ handleFavorite } />
      <p data-testid="recipe-category">{ strCategory }</p>
      <Ingredients max={ maxIngredients } page="details" />
      <p className="instructions" data-testid="instructions">{ strInstructions }</p>
      <iframe src={ strYoutube } title="video" data-testid="video" />
      <Recommendations recommendations={ recommendations } />
      <StartRecipe recipeType="meals" ingredients={ ingredients } />
    </div>
  );
};

export default MealDetails;