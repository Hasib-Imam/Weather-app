import React, { useState } from 'react'
import './Weather.css'
import search from './assets/search-icon.svg'
import rain from './assets/rain-icon.svg'
import cloud from './assets/cloud-icon.svg'
import darkCloud from './assets/Dark-cloud-icon.svg'
import humidity from './assets/humidity-icon.svg'
import wind from './assets/wind-icon.svg'
import snow from './assets/snow-icon.svg'
import windy from './assets/windy_icon.svg'
import clear from './assets/clear-icon.svg'
import './index.js'
import { useEffect } from 'react'


const Weather = () => {
    const [weatherData, setWeatherData]= useState(false)
    const allIcons = {
        "o1d": clear,
        "o1n": clear,
        "02d": rain,
        "02n": rain,
        "03d": wind,
        "03n": wind,
        "04d": cloud,
        "04n": cloud,
        "05d": snow,
        "05n": snow,
        "06d": darkCloud,
        "06n": darkCloud,
    
    }

    const search =async(city) =>{
        try{
            const url = `https://api.openweathermap.org/
            data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon,
               
            })
        }catch (err){


        }
    }

useEffect(()=>{
    search("New York");
},[])

    return (
        <div className='Weather'>
            <div className='search-bar'>
                <input type="text" placeholder='search..' />
                <img className='img-search' src={search} alt="" />
                
            </div>
            <img src={windy} alt=""  className='weather-icon' ></img>
            <p className='temperature'>{weatherData.temperature}°</p>
            <p className='location'>{weatherData.location}</p>

            <div className='weather-data'>

            <div className='col'>
                <div>
                <img src={humidity}/>
                <span>{weatherData.humidity}%</span>
                <p>Humidity</p>
                </div>
            </div>

            <div className='col'>
                <img src={wind}/>
                 <span>{weatherData.windSpeed} mp/h</span>
                 <p>Wind Speed</p>
                
                 </div>
            </div>
            

        </div>
    )
}
export default Weather