import React from "react";
import { useEffect, useState } from "react";
import { CircularProgress, Slide, TextField } from "@mui/material";
import moment from "moment";
import "./App.css";

const App = () => {
  const [cityName, setCityName] = useState("Chennai");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1232923b610d5570c1532e352c138fe6&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityName, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    <>
      <div className="bg_img">
        {!loading ? (
          <>
            <TextField
              variant="filled"
              label="Search location"
              className="input"
              error={error}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleSearch}
            />
            <h1 className="city">{data.name}</h1>
            
            <p className="date">{moment().format('dddd , MMMM Do YYYY')}</p>

            <div className="group">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/357/187/original/weather-forecast-icon-free-png.png"
                alt=""
              />
              <h1>{data.weather[0].main}</h1>
            </div>

            <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

            <Slide direction="right" timeout={800} in={!loading}>
              <div className="box_container">
                <div className="box">
                  <p>Fahrenheit</p>
                  <h2>{(data.main.temp.toFixed() * 1.8 + 32).toFixed()} °F </h2>
                </div>

                <div className="box">
                  <p>Humidity</p>
                  <h2>{data.main.humidity.toFixed()}%</h2>
                </div>

                <div className="box">
                  <p>Feels Like</p>
                  <h2>{data.main.feels_like.toFixed()} °C</h2>
                </div>

                <div className="box">
                  <p>Wind</p>
                  <h2>{data.wind.speed.toFixed()} km/h</h2>
                </div>

                <div className="box">
                  <p>Sunrise</p>
                  <h2>
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h2>
                </div>

                <div className="box">
                  <p>Sunset</p>
                  <h2>
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h2>
                </div>
              </div>
            </Slide>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default App;
