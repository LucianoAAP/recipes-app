import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from './renderWithReduxRouter';
import App from '../App';
import localStorageMock from './mocks/mockLocalStorage';

describe('Testa tela de receitas feitas', () => {
  beforeEach(() => {
    // Lógica de spyOn do localStorage tirada de https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(localStorageMock);
  });

  it('Testa os tesids', () => {
    renderWithReduxAndRouter(<App />, {}, {
      route: '/receitas-feitas',
    });
    expect(localStorage.getItem).toHaveBeenCalledWith('doneRecipes');
    console.log(localStorage.getItem('doneRecipes'));
    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterByAFoodBtn = screen.getByTestId('filter-by-food-btn');
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    const image0 = screen.getByTestId('0-horizontal-image');
    const topText0 = screen.getByTestId('0-horizontal-top-text');
    const name0 = screen.getByTestId('0-horizontal-name');
    const doneDate0 = screen.getByTestId('0-horizontal-done-date');
    const shareBtn0 = screen.getByTestId('0-horizontal-share-btn');
    const pastaTag = screen.getByTestId('0-Pasta-horizontal-tag');
    const curryTag = screen.getByTestId('0-Curry-horizontal-tag');
    const image1 = screen.getByTestId('1-horizontal-image');
    const topText1 = screen.getByTestId('1-horizontal-top-text');
    const name1 = screen.getByTestId('1-horizontal-name');
    const doneDate1 = screen.getByTestId('1-horizontal-done-date');
    const shareBtn1 = screen.getByTestId('1-horizontal-share-btn');
    expect(filterByAllBtn).toBeInTheDocument();
    expect(filterByAFoodBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();
    expect(image0).toBeInTheDocument();
    expect(topText0).toBeInTheDocument();
    expect(name0).toBeInTheDocument();
    expect(doneDate0).toBeInTheDocument();
    expect(shareBtn0).toBeInTheDocument();
    expect(pastaTag).toBeInTheDocument();
    expect(curryTag).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
    expect(topText1).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(doneDate1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();
  });
});
