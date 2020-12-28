function displayWeather(response) { 
    console.log(response.data);   
    let temperatureElement = document.querySelector("#current-temperature"); 
    let cityElement=document.querySelector("#current-city");
    let descriptionElement=document.querySelector("#description");
    let pressureElement= document.querySelector("#pressure");
    let humidityElement= document.querySelector("#humidity");
    let windspeedElement= document.querySelector("#wind-speed");
   
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    cityElement.innerHTML= response.data.main.name;
    descriptionElement.innerHTML=response.data.weather[0].weather; 
    pressureElement.innerHTML = response.data.main.pressure;
    humidityElement.innerHTML=response.data.main.humidity;
    windspeedElement.innerHTML= Math.round(response.data.wind.speed);
   }
   
   let apiKey = "a762ee58da3312e3b42c763f03cdad42";
   let units = `metric`;
   let city = "Vienna";
   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
   console.log(apiUrl);
   
   axios.get(apiUrl).then(displayWeather);
