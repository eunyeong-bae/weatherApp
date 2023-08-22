import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

/**
 * 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
 * 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태
 * 3. 5개 버튼이있음 (1개 현재 위치, 4개 다른 나라 도시)
 * 4. 도시버튼 클릭할 때마다 도시별 날씨가 보인다
 * 5. 현재 위치 기반 날씨버튼 클릭하면 다시 현재 위치 기반 날씨가 나온다
 * 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다
 */

const cities = ['paris', 'Vancouver', 'new york', 'seoul'];
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const [loading, setLoading] = useState(false)
  const [ city, setCity] = useState('');
  const [ currentWeatherData, setCurrentWeatherData] = useState( null);
  const [apiError, setAPIError] = useState('');
  
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7fda0b9c7c3c4b2693bc7c2c28417b14&units=metric`;
      setLoading(true);

      let response = await fetch(url);
      let data = await response.json();
      // console.log(data)
      setCurrentWeatherData(data);

      setLoading(false);

    } catch(error){
      setAPIError(error.message);
      setLoading(false);
      // console.log(e)
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(( position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      /**
       * 내 스타일대로
       * 1. axios 사용해서 API response 값 가져오기
       * let currentData = axios({
            method:'get',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7fda0b9c7c3c4b2693bc7c2c28417b14`
          }).then((res) => {
            const result = res;
            console.log(result)
          })
       */
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCity = async(cityName) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7fda0b9c7c3c4b2693bc7c2c28417b14&units=metric`
      setLoading(true);
      
      let response = await fetch(url);
      let data = await response.json();
      // console.log(data)
      setCurrentWeatherData(data);
      
      setLoading(false);

    } catch(error) {
      setAPIError(error.message);
      setLoading(false);
      // console.log(e);
    }
  };
  
  useEffect(() => {
    if(city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity( city);
    }
  }, [city]);
  

  return (
    <div>
      <div className='container style-flex'>
        { loading 
          ? <ClipLoader
              color='#f86c6b'
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          : !apiError ? (
            <>
              <WeatherBox currentWeatherData={currentWeatherData} />
              <WeatherButton cities={cities} currentCityNM={city} setCity={setCity}/>
            </> 
          ) : (
            apiError
          )
        }  
      </div>
    </div>
  );
}

export default App;
