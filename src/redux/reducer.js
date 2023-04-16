import {
    FETCH_WEATHER_DATA_REQUEST,
    FETCH_WEATHER_DATA_SUCCESS,
    FETCH_WEATHER_DATA_FAILURE,
  } from './actionTypes';
  
  const init = {
    weatherData: null,
    isLoading: false,
    error: null,
  };
  
  export const weatherDataReducer = (state = init, action) => {
    switch (action.type) {
      case FETCH_WEATHER_DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          weatherData: null,
          error: null

        };
      case FETCH_WEATHER_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          weatherData: action.payload,
          error: null
        };
      case FETCH_WEATHER_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          weatherData: null 
        };
      default:
        return state;
    }
  };
  