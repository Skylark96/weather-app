import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
  TiWeatherWindyCloudy,
} from "react-icons/ti";
import { fetchWeatherData } from "../redux/actions";
import { ImLocation } from "react-icons/im";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";

const WeatherInfo = () => {
  const [city, setcity] = useState("");
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  const [weatherIcon, setWeatherIcon] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleWeatherIcon = (weatherDescription) => {
    switch (weatherDescription) {
      case "clear sky":
        setWeatherIcon(<TiWeatherSunny className="sun" />);
        break;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        setWeatherIcon(<TiWeatherPartlySunny className="cloud" />);
        break;
      case "light intensity drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
      case "heavy intensity drizzle":
      case "drizzle":
      case "drizzle rain":
      case "light intensity drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
        setWeatherIcon(<TiWeatherShower className="rain" />);
        break;
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
      case "freezing rain":
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        setWeatherIcon(<TiWeatherDownpour className="rain" />);
        break;
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        setWeatherIcon(<TiWeatherStormy className="lightning" />);
        break;
      case "light snow":
      case "snow":
      case "heavy snow":
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        setWeatherIcon(<TiWeatherSnow className="snow" />);
        break;
      case "mist":
      case "smoke ":
      case "haze":
      case "sand/dust whirls":
      case "fog":
        setWeatherIcon(<TiWeatherWindyCloudy className="cloud" />);
        break;
      case "sand":
      case "dust":
      case "volcanic ash":
      case "squalls":
      case "tornado":
        setWeatherIcon(<TiWeatherWindy className="cloud" />);
        break;
      default:
        setWeatherIcon(null);
        break;
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeatherData(latitude, longitude));
      },
      (error) => {
        console.log(error);
      }
    );
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchWeatherData(city));
  };

  useEffect(() => {
    if (weatherData) {
      handleWeatherIcon(weatherData.weather[0].description);
    }
  }, [weatherData]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={city}
          onChange={(e) => setcity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      <div>
        {isLoading && <div class="custom-loader"></div>}
        {error && <div className="error">{error}</div>}
        {weatherData && (
          <div className="weather-info">
            <div className="city-weather">
              <div className="city-info">
                <div className="city-name">
                  <div>
                    {" "}
                    <ImLocation />
                    City: {weatherData.name}, {weatherData.sys.country}
                  </div>
                  <div>{date.toLocaleDateString()}</div>
                </div>
                <div className="sun-time">
                  <div>
                    Sunrise:{" "}
                    {new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                  <div>
                    Sunset:{" "}
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit", hour12: false }
                    )}
                  </div>
                </div>
              </div>
              <div className="weather-icon">{weatherIcon}</div>
              <p> {weatherData.weather[0].description}</p>
            </div>
            <div className="weather-description">
              <p>
                <FaTemperatureHigh /> Temperature:{" "}
                {Math.round(weatherData.main.temp)} &#8451;
              </p>
              <p>
                <GiWindsock size={"30px"} /> Wind Speed:{" "}
                {weatherData.wind.speed} m/s
              </p>
              <p>
                <WiHumidity size={"40px"} /> Humidity:{" "}
                {weatherData.main.humidity}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;
