import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherTab from "./components/WeatherTab";
import { MdRefresh } from "react-icons/md";
import Navbar from "./components/NavBar";
import HourlyForecast from "./components/HourlyForecast ";
import DailyForecast from "./components/DailyForecast";

const cities = [
  { name: "Beijing", lat: 39.9042, lon: 116.4074 },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "Los Angeles", lat: 34.0549, lon: -118.2426 },
];

const fetchWeatherData = async (
  city,
  setWeatherData,
  setHourlyWeather,
  setDailyWeather
) => {
  const { lat, lon } = city;
  const apiKey = "482944e26d320a80bd5e4f23b3de7d1f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const { hourly, daily } = response.data;

    const formattedHourly = hourly.slice(0, 4).map((hour) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(hour.temp),
      precipitation: hour.pop * 100,
      condition: hour.weather[0].main,
    }));

    const formattedDaily = daily.slice(1, 6).map((day) => ({
      dt: day.dt,
      temp: day.temp,
      weather: day.weather,
    }));

    setWeatherData(response.data);
    setHourlyWeather(formattedHourly);
    setDailyWeather(formattedDaily);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);

  useEffect(() => {
    fetchWeatherData(
      selectedCity,
      setWeatherData,
      setHourlyWeather,
      setDailyWeather
    );
  }, [selectedCity]);

  const refreshWeatherData = () => {
    fetchWeatherData(
      selectedCity,
      setWeatherData,
      setHourlyWeather,
      setDailyWeather
    );
  };
  //I didn't have the apikey to search fopr the city.
  // const handleSearch = async (searchTerm) => {
  //   if (searchTerm.length < 3) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(
  //       `https://api.weatherbit.io/v2.0/cities?city=${searchTerm}&key=`
  //     );
  //     setSelectedCity(response.data.data[0]);
  //   } catch (error) {
  //     console.error("Error searching for cities:", error);
  //   }
  // };
  return (
    <div style={{ width: "100vw" }}>
      <div className="app-container" style={{ width: "25%", margin: "auto" }}>
        <Navbar />
        <button
          onClick={refreshWeatherData}
          style={{
            margin: "10px",
            padding: "5px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MdRefresh style={{ marginRight: "5px" }} />
          Refresh Data
        </button>
        <div
          className="tabs-container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {cities.map((city) => (
            <WeatherTab
              key={city.name}
              city={city}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          ))}
        </div>
        <HourlyForecast hourlyData={hourlyWeather} />
        <DailyForecast dailyData={dailyWeather} />
        {/*  */}
      </div>
    </div>
  );
}

export default App;
