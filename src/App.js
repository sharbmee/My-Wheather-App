import React, { useEffect, useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen";
import SearchScreen from "./components/SearchScreen";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
// import WeatherAnimation from "./components/WeatherAnimation";
import {
  getWeatherByCoords,
  getWeatherByCity,
  getForecastByCoords,
  getCoordsByCity,
} from "./services/weatherService";

function App() {
  const [screen, setScreen] = useState("main"); // "main" or "search"
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]); // 5-day aggregated
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cityUsed, setCityUsed] = useState(""); // for display

  const DEFAULT_CITY = "Jaipur"; // fallback only if nothing saved
const [defaultCity, setDefaultCity] = useState(
  localStorage.getItem("myCity") || DEFAULT_CITY
);

  useEffect(() => {
    // On load: try geolocation -> fallback to default city
    fetchByGeolocationOrDefault();
    // eslint-disable-next-line
  }, []);

  const fetchByGeolocationOrDefault = () => {
    setLoading(true);
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await fetchByCoords(latitude, longitude);
          setLoading(false);
        },
        async (err) => {
          // permission denied or unavailable: fallback to default city
          await fetchByCity(DEFAULT_CITY);
          setLoading(false);
        },
        { timeout: 8000 }
      );
    } else {
      // no geolocation support
      fetchByCity(DEFAULT_CITY).finally(() => setLoading(false));
    }
  };

  const fetchByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      const curr = await getWeatherByCoords(lat, lon);
      const fc = await getForecastByCoords(lat, lon);
      setCurrent(curr);
      setForecast(fc);
      setCityUsed(curr?.name || "");
    } catch (err) {
      setError("Failed to load weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = async (city) => {
    try {
      setLoading(true);
      setError("");
      const coords = await getCoordsByCity(city);
      if (!coords) throw new Error("City not found");

      const curr = await getWeatherByCity(city);
      const fc = await getForecastByCoords(coords.lat, coords.lon);

      setCurrent(curr);
      setForecast(fc);
      setCityUsed(curr?.name || city);
      setScreen("main");

      // Save as user’s city
      localStorage.setItem("myCity", city);
      setDefaultCity(city);
    } catch (err) {
      setError("City not found or API error. Try another city.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (!city) return;
    fetchByCity(city);
  };

  return (

    <div className="App">
      <header className="app-top d-flex justify-content-between align-items-center mb-3 w-100">
      <h1 style={{ cursor: "pointer" }} onClick={() => setScreen("main")}>
        🌤 MyWeather
      </h1>
      <div
        className="btn-group btn-group-lg"
        role="group"
        aria-label="Weather options"
      >
        {/* My City Button */}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            setScreen("main");
            fetchByCity(defaultCity);
          }}
        >
          My City
        </button>

        {/* Search / Change City Button */}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setScreen("search")}
        >
          Search City
        </button>

        {/* Use My Location Button */}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            setScreen("main");
            fetchByGeolocationOrDefault(); 
          }}
        >
          Use My Location
        </button>
      </div>

      </header>

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {!loading && screen === "search" && (
        <SearchScreen onSearch={handleSearch} onBack={() => setScreen("main")} />
      )}

      {!loading && screen === "main" && current && (
        <MainScreen current={current} forecast={forecast} cityUsed={cityUsed} />
      )}

      {!loading && screen === "main" && !current && (
        <div className="empty-msg">No weather loaded. Try "Use my location" or Search.</div>
      )}

      <footer className="footer">
        <small>Made With ❤️ • By Arabaj Hashmee</small>
      </footer>
    </div>
  );
}

export default App;