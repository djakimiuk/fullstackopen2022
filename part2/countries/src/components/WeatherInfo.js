import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ capitalCity }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric&q=`;
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    axios
      .get(`${weatherURL}${capitalCity}`)
      .then((response) => setWeatherData(response.data))
      .catch((error) => console.log(`There was an error: ${error}`));
  }, [capitalCity]);

  return weatherData ? (
    <>
      <h2>Weather in {capitalCity}</h2>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      ></img>
      <p>wind {weatherData.wind.speed} m/s</p>
    </>
  ) : null;
};

export default WeatherInfo;
