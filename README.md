# 🌤 MyWeather - React Weather App

A **responsive and interactive weather application** built with **React.js**, providing real-time weather data, 5-day forecasts, and user-friendly features like geolocation, city search, and my city (last search city) settings.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

**Live Demo:** *(Add your deployed app link here if hosted on Netlify, Vercel, etc.)*  

---

## Features

- Display **current weather** by city or geolocation
- Show **5-day weather forecast** with icons
- Search for **any city worldwide**
- Set a **default city** to quickly access your preferred location
- Animated and visually appealing UI
- Mobile responsive layout
- Loader animation while fetching data
- Error handling for invalid city names or API failures

---

## Technologies Used

- **React.js** - Frontend library  
- **Bootstrap 5** - UI components & responsive layout  
- **Axios** - HTTP client for API requests  
- **OpenWeatherMap API** - Weather data  
- **HTML5 & CSS3** - Layout and styling  

---

## Setup & Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/myweather-react.git
cd myweather-react
````

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file** in the project root:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

4. **Start the development server:**

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Usage

* Click **"My City"** to load your saved default city weather.
* Click **"Search City"** to search for any city.
* Click **"Use My Location"** to fetch weather based on your current geolocation.
* The app will display **current temperature, weather description, humidity, wind speed**, and **5-day forecast**.


## Environment Variables

* `REACT_APP_WEATHER_API_KEY` - Your API key from [OpenWeatherMap](https://openweathermap.org/api).
* **Important:** `.env` is ignored by Git (`.gitignore`) so your API key remains private.


## Project Structure


myweather-react/
├─ public/
│  ├─ index.html
│  ├─ favicon.ico
│  └─ manifest.json
├─ src/
│  ├─ components/
│  │  ├─ MainScreen.js
│  │  ├─ SearchScreen.js
|  |  ├─ WheatherIcons.js
│  │  ├─ Loader.js
│  │  ├─ ErrorMessage.js
│  │  └─ WeatherAnimation.js
│  ├─ services/
│  │  └─ weatherService.js
│  ├─ App.js
│  ├─ App.css
|  ├─ index.css
|  ├─ index.js
|  └─reportWebVitals.js
├─ .env
├─ package.json
├─ package-lock.json
└─ README.md


## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Create a pull request

---

## License

This project is licensed under the **MIT License**.

---

Made with ❤️ by **Arbaz Hashmee**

```

---

This README is **GitHub-ready**, explains setup, usage, features, and has a clean project structure.  

If you want, I can **also add a “How to deploy on Netlify or Vercel” section** so your app can go live easily.  

Do you want me to add that?
```
