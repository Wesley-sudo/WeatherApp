import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Axios from "axios";
import './css/App.css';

function App() {

  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getUser = () => {

      Axios.get("http://localhost:3001/auth/login/success", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
        .then((resObject) => {
          setUser(resObject.data.user);
          if (resObject.data.user === null || resObject.data.user.local.location === "N/A" ) {
            Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=169750dd0b5c4876989125852221306&q=${ "Manila" }&days=7&aqi=no&alerts=no`, { credentials: "include" })
              .then((response) => {
                setWeatherData( response.data );
              })
              .catch((err) => {
                console.log(err);
              })
          }
          else {
            Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=169750dd0b5c4876989125852221306&q=${ resObject.data.user.local.location }&days=7&aqi=no&alerts=no`, { credentials: "include" })
            .then((response) => {
              setWeatherData( response.data );
            })
            .catch((err) => {
              console.log(err);
            })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getUser();
  }, []);

  return !weatherData ? null : (
    <BrowserRouter>
      <div>
        <Navbar user={ user } />
        <Routes>
          <Route path="/" element={<Home weatherData={ weatherData } />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
