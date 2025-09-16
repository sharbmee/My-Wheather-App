// service wrapper for OpenWeatherMap
// Replace API_KEY below with your actual key
// weatherService.js
const API_KEY = "15b975a1cd5779ffd203c60a5584c3a9";
const BASE = "https://api.openweathermap.org/data/2.5";

// fetch current weather by coordinates
export async function getWeatherByCoords(lat, lon) {
  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
}

// fetch current weather by city name
export async function getWeatherByCity(city) {
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch current weather by city");
  return res.json();
}

// get lat/lon for a city (used to request forecast)
export async function getCoordsByCity(city) {
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.coord) return null;
  return { lat: data.coord.lat, lon: data.coord.lon };
}

// fetch 5-day forecast by coords (OpenWeatherMap 5-day/3-hour)
export async function getForecastByCoords(lat, lon) {
  const url = `${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch forecast");
  const data = await res.json();
  // Aggregate to daily: pick item closest to 12:00 each day
  const list = data.list || [];
  const daysMap = {}; // dateYYYY-MM-DD -> array of items
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daysMap[date]) daysMap[date] = [];
    daysMap[date].push(item);
  });
  const days = Object.keys(daysMap)
    .slice(0, 6) // ensure we have at most 5-6 entries; first item may be today
    .map((date) => {
      const items = daysMap[date];
      // prefer 12:00, else nearest time
      let chosen = items.reduce((prev, curr) => {
        const targetHour = 12;
        const prevHour = parseInt(prev.dt_txt.split(" ")[1].split(":")[0], 10);
        const currHour = parseInt(curr.dt_txt.split(" ")[1].split(":")[0], 10);
        return Math.abs(currHour - targetHour) < Math.abs(prevHour - targetHour) ? curr : prev;
      }, items[0]);
      const temps = items.map((i) => i.main.temp);
      const temp_min = Math.min(...items.map((i) => i.main.temp_min));
      const temp_max = Math.max(...items.map((i) => i.main.temp_max));
      return {
        date,
        temp_min,
        temp_max,
        icon: chosen.weather[0].icon,
        description: chosen.weather[0].description,
      };
    });

  return days.slice(0, 5);
}