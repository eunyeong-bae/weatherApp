import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const WeatherBox = (props) => {
    const { currentWeatherData} = props;
    const [ isMore, setIsMore] = useState( false);

    const handleMoreWeatherInfo = () => setIsMore( !isMore);

  return (
    <div className='weather-box style-flex'>
        <div className='city'>{ currentWeatherData?.name}</div>
        <h2 className='temparature'>{ `${currentWeatherData?.main.temp} °C`} / {`${Math.floor(currentWeatherData?.main.temp *1.8 + 32)} °F`}</h2>
        <h3 className='weather'>{currentWeatherData?.weather[0].description}</h3>
        <div className='more-btn'>
            <Button variant="outline-light" onClick={ handleMoreWeatherInfo}>{ isMore ? '- close' : '+ more'}</Button>
        </div>
        { isMore && 
            <div className='container-more'>
                <div>temp_max : { currentWeatherData?.main.temp_max}</div>
                <div>temp_min : { currentWeatherData?.main.temp_min}</div>
                <div>feels_like : { currentWeatherData?.main.feels_like}</div>
                <div>humidity : { currentWeatherData?.main.humidity}</div>
            </div>
        }
    </div>
  )
}

export default WeatherBox
