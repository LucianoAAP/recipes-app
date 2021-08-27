import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FOOD_RESPONSE, FOOD_PARAMETER_RESET } from '../../redux/reducers/foodReducer';
import { getFoodTypesList, getFoodByFilter, getFood } from '../../services/foodAPI';
import MealCard from '../MealCard';
import Loading from '../Loading';

const FoodList = () => {
  const TWELVE = 12;
  const FIVE = 5;
  const loading = useSelector(({ food }) => food.loading);
  const meals = useSelector(({ food }) => food.meals);
  const error = useSelector(({ food }) => food.error);
  const getParameter = useSelector(({ food }) => food.redirectedWithParameter);
  const dispatch = useDispatch();
  const [foodTypesList, setFoodTypesList] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [foodFilter, setFoodFilter] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState(meals);
  const [originalMeals, setOriginalMeals] = useState(meals);

  useEffect(() => {
    const getFirstMeals = async () => {
      const { parameter, term } = getParameter;
      if (parameter === 'ingredient') {
        const filteredByIngredient = await getFood(term);
        dispatch({ type: FOOD_RESPONSE, payload: filteredByIngredient });
        setOriginalMeals(filteredByIngredient);
        setFilteredMeals(filteredByIngredient);
      } else {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const { meals: startMeals } = await response.json();
        dispatch({ type: FOOD_RESPONSE, payload: startMeals });
        setOriginalMeals(startMeals);
        setFilteredMeals(startMeals);
      }
    };
    getFirstMeals();
  }, [dispatch, getParameter]);

  useEffect(() => () => dispatch({ type: FOOD_PARAMETER_RESET }), [dispatch]);

  useEffect(() => {
    getFoodTypesList().then((list) => {
      const reducedList = list.filter((el, index) => index < FIVE);
      setFoodTypesList(reducedList);
      setLoadingList(false);
    });
  }, []);

  useEffect(() => {
    if (foodFilter) {
      const getFilteredMeals = async () => {
        const response = await getFoodByFilter(foodFilter);
        setFilteredMeals(response);
      };
      getFilteredMeals();
    }
  }, [foodFilter]);

  useEffect(() => {
    setFilteredMeals(meals);
  }, [meals]);

  const clickHandler = (foodType) => {
    if (foodType === foodFilter) {
      setFoodFilter(false);
      setFilteredMeals(meals);
    } else {
      setFoodFilter(foodType);
    }
  };

  const clickHandlerAll = () => {
    setFilteredMeals(meals);
    setFoodFilter(false);
  };

  if (loading || loadingList) return <Loading />;

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Algo deu errado, favor tentar novamente!</p>
      </div>
    );
  }

  if (!filteredMeals) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    setFilteredMeals(originalMeals);
    return <p>Nenhuma receita encontrada...</p>;
  }

  if (filteredMeals.length === 1 && !foodFilter) {
    return <Redirect to={ `/comidas/${filteredMeals[0].idMeal}` } />;
  }

  return (
    <>
      <div>
        <Button
          data-testid="All-category-filter"
          size="lg"
          onClick={ clickHandlerAll }
        >
          All
        </Button>
        {
          foodTypesList.map((foodType, index) => (
            <Button
              key={ index }
              data-testid={ `${foodType}-category-filter` }
              size="lg"
              onClick={ () => clickHandler(foodType) }
            >
              { foodType }
            </Button>
          ))
        }
      </div>
      <div className="d-flex flex-row flex-wrap">
        {
          filteredMeals.filter((e, index) => index < TWELVE)
            .map((meal, index) => (
              <MealCard
                key={ `${index}-card-name` }
                // data-testid={ `${index}-recipe-card` }
                meal={ meal }
                index={ index }
              />
            ))
        }
      </div>
    </>
  );
};

export default FoodList;
