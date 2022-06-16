import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Axios from "axios";
import './css/App.css';

function App() {

  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getUser = () => {

      Axios.get("http://localhost:3001/auth/login/success", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err);
        })
        
        Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ response.data.local.location }&days=7&aqi=no&alerts=no`, { credentials: "include" })
          .then((response) => {
            setWeatherData( response.data );
          })
          .catch((err) => {
            console.log(err);
          })
        //   if (response.status === 200) return response.json();
        //   throw new Error("authentication has been failed!");
        // })
        // .then((resObject) => {
        //   setUser(resObject.user);
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    };
    getUser();
  }, []);

  return !weatherData ? null : (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home weatherData={ weatherData } />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
