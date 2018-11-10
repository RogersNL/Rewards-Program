const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const weatherActionCreators = {
  requestWeatherForecasts: () => async (dispatch, getState) => {
    dispatch({ type: requestWeatherForecastsType });

    const url = `https://api.pokemontcg.io/v1/cards`;
    const response = await fetch(url);
    const forecasts = await response.json();
    console.log(forecasts);

    dispatch({ type: receiveWeatherForecastsType, forecasts });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestWeatherForecastsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
      forecasts: action.forecasts,
      isLoading: false
    };
  }

  return state;
};
