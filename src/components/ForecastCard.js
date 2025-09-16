import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastCard({ day }) {
  // day: { date: '2025-09-16', temp_min, temp_max, icon, description }
  const dateObj = new Date(day.date);
  const label = dateObj.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="forecast-card card">
      <div className="fc-header">{label}</div>
      <WeatherIcon icon={day.icon} size={60} alt={day.description} />
      <div className="fc-desc">{day.description}</div>
      <div className="fc-temp">
        <span>{Math.round(day.temp_max)}°</span>
        <span className="muted">{Math.round(day.temp_min)}°</span>
      </div>
    </div>
  );
}
