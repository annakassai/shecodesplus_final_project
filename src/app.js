function formatTime(timestamp) {
    let currentTime = new Date(timestamp); 
    let currentHours = currentTime.getHours();
    if (currentHours < 10)
        currentHours = `0${currentHours}`;
    let currentMinutes = currentTime.getMinutes();
    if (currentMinutes < 10)
        currentMinutes = `0${currentMinutes}`;
    let weekDays= [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let currentDay = weekDays[currentTime.getDay()];

    return `${currentDay} ${currentHours}:${currentMinutes}`
}

function displayWeather(response) { 
    let temperatureElement = document.querySelector("#current-temperature"); 
    let cityElement=document.querySelector("#current-city");
    let descriptionElement=document.querySelector("#description");
    let pressureElement= document.querySelector("#pressure");
    let humidityElement= document.querySelector("#humidity");
    let windspeedElement= document.querySelector("#wind-speed");
    let timeElement=document.querySelector("#current-day-time");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
   
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    cityElement.innerHTML= response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description; 
    pressureElement.innerHTML = response.data.main.pressure;
    humidityElement.innerHTML=response.data.main.humidity;
    windspeedElement.innerHTML= Math.round(response.data.wind.speed);
    timeElement.innerHTML=formatTime(response.data.dt*1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
   let apiKey = "a762ee58da3312e3b42c763f03cdad42";
   let units = `metric`;
   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
   axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
    event.preventDefault();
    cityinputElement = document.querySelector("#city-input");
    search(cityinputElement.value)
}
    
   let searchcityButton = document.querySelector("#search-city");
   searchcityButton.addEventListener("submit", submitCity);

   function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "a762ee58da3312e3b42c763f03cdad42";
    let units = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let locationButton = document.querySelector("#location");
  locationButton.addEventListener("click", getCurrentLocation);

  search("Vienna")