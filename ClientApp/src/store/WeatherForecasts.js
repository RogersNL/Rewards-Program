const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const weatherActionCreators = {
  requestWeatherForecasts: token => async (dispatch, getState) => {
    dispatch({ type: requestWeatherForecastsType });
    const headers = { 'Authorization': 'Bearer ' + token };
    const url = `https://graph.microsoft.com/v1.0/me/`;
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
