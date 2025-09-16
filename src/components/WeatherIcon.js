import React from "react";

/**
 * Displays OpenWeatherMap icon via their URL.
 * Props:
 *  - icon: e.g. "04d"
 *  - size: px (optional)
 */
export default function WeatherIcon({ icon, alt = "", size = 80 }) {
  const src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return <img src={src} alt={alt} width={size} height={size} />;
}
