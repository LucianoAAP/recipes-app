const getFoodByIngredient = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por ingredientes: ${error}`;
  // }
};

const getFoodByName = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por nome: ${error}`;
  // }
};

const getFoodByFirstLetter = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca pela Primeira Letra: ${error}`;
  // }
};

const getFoodById = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca pelo id: ${error}`;
  // }
};

export const getFoodTypesList = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await response.json();
  const foodTypes = meals.map(({ strCategory }) => strCategory);
  return foodTypes;
};

export const getFoodByFilter = async (term) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
  const { meals } = await response.json();
  return meals;
};

export const getFood = (term, type) => {
  switch (type) {
  case 'Primeira Letra':
    return getFoodByFirstLetter(term);
  case 'Nome':
    return getFoodByName(term);
  case 'id':
    return getFoodById(term);
  default:
    return getFoodByIngredient(term);
  }
};

export const getMealsForRecommendation = async () => {
  // try {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  const maxIndex = 5;
  const getMeals = meals.filter((_meal, index) => index <= maxIndex)
    .map((meal) => meal.strMeal);
  return getMeals;
  // } catch (error) {
  //   return `Algo deu errado na busca: ${error}`;
  // }
};

export const getFoodByArea = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por área: ${error}`;
  // }
};

export const getAreas = async () => {
  // try {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por áreas: ${error}`;
  // }
};

export const getFoodIngredients = async () => {
  // try {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por ingredientes: ${error}`;
  // }
};
