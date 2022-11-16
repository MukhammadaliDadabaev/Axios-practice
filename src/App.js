import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // STATE
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  // API
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=19db4ed2fb8947b1923184624221511&q=Namangan"
      )
      .then((data) => {
        setWeather(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //------> 1-Usul
  // if (!weather) return null;

  // Events-FUNC
  const searchInput = (e) => {
    setInput(e.target.value);
  };

  const searchBtn = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=19db4ed2fb8947b1923184624221511&q=${input}`
      )
      .then((res) => {
        setWeather(res.data);
      });
  };

  return (
    <div className="App">
      <h1>Weather app</h1>
      <div className="search-input">
        <input className="input" type="text" onChange={searchInput} />
        <button onClick={searchBtn}>Search</button>
      </div>
      {weather && (
        <div className="weather-info">
          <p>
            <b>Country: </b>
            {weather.location.country}
          </p>
          <p>
            <b>City: </b>
            {weather.location.region}
          </p>
          <p>
            <b>Date: </b>
            {weather.location.localtime}
          </p>
          <p>
            <b>Region: </b>
            {weather.location.tz_id}
          </p>
          <div>
            <img src={weather.current.condition.icon} alt="logo" />
          </div>
          <p>
            <b>State: </b>
            {weather.current.condition.text}
          </p>
          <p>
            <b>Temperature: </b>
            {weather.current.temp_c}
            <sup>&deg;</sup>C{/* <sup>0</sup>C&nbsp; °C*/}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
