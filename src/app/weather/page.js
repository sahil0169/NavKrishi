"use client";
import { useState, useEffect } from "react";
import styles from "./weather.module.css";
import "./forecast.css"// Import the CSS module
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Navbar from "C:/Users/SAHIL AGARWAL/Downloads/Agriculture/NavKrishi/src/app/components/Navbar.js"

export default function CropApp() {
  const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suitableCrops, setSuitableCrops] = useState([]);
  const [error, setError] = useState(null);
  const [cropData, setCropData] = useState([]);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    fetch("/crop.json")
      .then((response) => response.json())
      .then((data) => setCropData(data))
      .catch((err) => console.error("Error fetching crop data:", err));
  }, []);

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError(null);

    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      checkCropSuitability(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setSuitableCrops([]);
    }

    try {
      const response1 = await fetch(url1);
      if (!response1.ok) {
        throw new Error("City not found");
      }
      const data1 = await response1.json();
      setForecastData(data1);
    } catch (error) {
      setError(error.message);
      setForecastData(null);
    }
  };

  const parseRange = (rangeStr) => {
    const [min, max] = rangeStr.split("-").map(Number);
    return { min, max };
  };

  const checkCropSuitability = (weather) => {
    const { temp, humidity } = weather.main;

    const suitableCropsList = cropData.filter((crop) => {
      const tempRange = parseRange(crop["TemperatureRange"]);
      const humidityRange = parseRange(crop["Relative Humidity (%)"]);

      const tempSuitable = temp - 6 >= tempRange.min && temp - 6 <= tempRange.max;
      const humiditySuitable = humidity >= humidityRange.min && humidity <= humidityRange.max;

      return tempSuitable && humiditySuitable;
    });

    setSuitableCrops(suitableCropsList);
  };

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <main>
    <div className={styles.container}>
      <Navbar />
      

      <form className={styles.form1} onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          className={styles.input1}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={styles.button1} type="submit">Search</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {weatherData && (
        <div className={styles.weatherInfo}>
          <div className={styles.weather}>
            <div className={styles.top}>
              <div>
                <p className={styles.city}>{weatherData.name}</p>
                <p className={styles.weatherDescription}>{weatherData.weather[0].description}</p>
              </div>
              <img
                alt="weather"
                className={styles.weatherIcon}
                src={`${weatherData.weather[0].icon}.png`}
              />
            </div>
            <div className={styles.bottom}>
              <p className={styles.temperature}>{Math.round(weatherData.main.temp)}°C</p>
              <div className={styles.details}>
                <div className={styles.parameterRow}>
                  <span className={styles.parameterLabel}>Feels like</span>
                  <span className={styles.parameterValue}>
                    {Math.round(weatherData.main.feels_like)}°C
                  </span>
                </div>
                <div className={styles.parameterRow}>
                  <span className={styles.parameterLabel}>Wind</span>
                  <span className={styles.parameterValue}>{weatherData.wind.speed} m/s</span>
                </div>
                <div className={styles.parameterRow}>
                  <span className={styles.parameterLabel}>Humidity</span>
                  <span className={styles.parameterValue}>{weatherData.main.humidity}%</span>
                </div>
                <div className={styles.parameterRow}>
                  <span className={styles.parameterLabel}>Pressure</span>
                  <span className={styles.parameterValue}>{weatherData.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {forecastData && (
        <div>
          <Accordion allowZeroExpanded>
            {forecastData.list.splice(0, 7).map((item, idx) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className={styles.dailyItem}>
                      <img src={`${item.weather[0].icon}.png`} className={styles.iconSmall} alt="weather" />
                      <label className={styles.day}>{forecastDays[idx]}</label>
                      <label className={styles.description}>{item.weather[0].description}</label>
                      <label className={styles.minMax}>
                        {Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C
                      </label>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className={styles.dailyDetailsGrid}>
                    <div className={styles.dailyDetailsGridItem}>
                      <label>Pressure:</label>
                      <label>{item.main.pressure}</label>
                    </div>
                    <div className={styles.dailyDetailsGridItem}>
                      <label>Humidity:</label>
                      <label>{item.main.humidity}</label>
                    </div>
                    <div className={styles.dailyDetailsGridItem}>
                      <label>Clouds:</label>
                      <label>{item.clouds.all}%</label>
                    </div>
                    <div className={styles.dailyDetailsGridItem}>
                      <label>Wind speed:</label>
                      <label>{item.wind.speed} m/s</label>
                    </div>
                    <div className={styles.dailyDetailsGridItem}>
                      <label>Sea level:</label>
                      <label>{item.main.sea_level}m</label>
                    </div>
                    <div className={styles.dailyDetailsGridItem}>
                      <label>Feels like:</label>
                      <label>{item.main.feels_like}°C</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {suitableCrops.length > 0 && (
        <div className={styles.cropInfo}>
          <h3>Suitable Crops for {city}:</h3>
          <div className={styles.cropContainer}>
            {suitableCrops.map((crop, index) => (
              <div className={styles.cropCard} key={index}>
                <h3>{crop.Plant}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {weatherData && suitableCrops.length === 0 && (
        <p>No suitable crops found for the current weather conditions.</p>
      )}
      </div>
    
      </main>
  );
}
