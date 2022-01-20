import meals from './data/meals';
import areas from './data/areas';
import emptyMeals from './data/emptyMeals';
import japaneseMeals from './data/japaneseMeals';
import mealCategories from './data/mealCategories';
import mealIngredients from './data/mealIngredients';
import drinkIngredients from './data/drinkIngredients';
import mealsByIngredient from './data/mealsByIngredient';
import drinksByIngredient from './data/drinksByIngredient';

const mockFetch = async (url) => ({
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') {
      return areas;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return mealCategories;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return meals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
      return emptyMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese') {
      return japaneseMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') {
      return mealIngredients;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
      return drinkIngredients;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') {
      return mealsByIngredient;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
      return drinksByIngredient;
    }
  },
});

export default mockFetch;
