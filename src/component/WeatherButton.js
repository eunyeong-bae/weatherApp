import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, currentCityNM, setCity}) => {
  return (
    <div className='container-button style-flex'>
        <Button 
            variant={ currentCityNM === '' ? "outline-primary" : "primary" } 
            onClick={()=>setCity('')}
        >
            Current Location
        </Button>
        {
            cities.map((city,idx) => {
                return (
                    <Button 
                        variant={ currentCityNM === city ? "outline-primary" : "primary" }
                        key={idx}  
                        onClick={() => {setCity(city)}}
                    >
                        {city}
                    </Button>
                )
            })
        }
    </div>
  )
}

export default WeatherButton
