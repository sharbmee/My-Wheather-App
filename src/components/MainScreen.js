import React from "react";
import WeatherIcon from "./WeatherIcon";
import ForecastCard from "./ForecastCard";

export default function MainScreen({ current, forecast = [], cityUsed }) {
  if (!current || !current.main) return null;

  return (
        <div className="main-screen">
        <div className="current-card card">
        <div className="left">
        <h2 className="city">{cityUsed}</h2>
        <p className="desc">{current.weather[0].description}</p>
        <div className="temp">{Math.round(current.main.temp)}°C</div>
        <div className="meta">
            <span>Humidity: {current.main.humidity}%</span>
            <span>Wind: {current.wind.speed} m/s</span>
        </div>
        </div>
        <div className="right">
        <WeatherIcon 
            icon={current.weather[0].icon} 
            alt={current.weather[0].description} 
            size={120} 
        />
        </div>
        </div>
      <h3 className="forecast-title">5-day's forecast</h3>
      <div className="forecast-list">
        {forecast.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
