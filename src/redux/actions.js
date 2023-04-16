import axios from 'axios';
import {
  FETCH_WEATHER_DATA_REQUEST,
  FETCH_WEATHER_DATA_SUCCESS,
  FETCH_WEATHER_DATA_FAILURE,
} from './actionTypes';

export const fetchWeatherDataRequest = () => ({
  type: FETCH_WEATHER_DATA_REQUEST,
});

export const fetchWeatherDataSuccess = (data) => ({
  type: FETCH_WEATHER_DATA_SUCCESS,
  payload: data,
});

export const fetchWeatherDataFailure = (error) => ({
  type: FETCH_WEATHER_DATA_FAILURE,
  payload: error,
});

export const fetchWeatherData = (city) => {
  const API_KEY= "e26c490dc7c09a645cd05e55dbb656a7"
  return (dispatch) => {
    dispatch(fetchWeatherDataRequest());
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        dispatch(fetchWeatherDataSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchWeatherDataFailure(errorMessage));
      });
  };
};
