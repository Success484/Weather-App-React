'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';

const api = {
  key: '2c4d8686994a4f0914e7a3935603188a',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('London');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error.message);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July', // Fixed typo: changed 'july' to 'July'
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // Function to perform the initial search for London weather
  const getLondonWeather = async () => {
    try {
      const response = await fetch(`${api.base}weather?q=London&units=metric&APPID=${api.key}`);
      if (!response.ok) {
        throw new Error('Unable to fetch weather data for London');
      }
      const result = await response.json();
      setWeather(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching London weather data:', error.message);
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    getLondonWeather();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className={(typeof weather.main !== 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <div>
            <div className='location-box'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
