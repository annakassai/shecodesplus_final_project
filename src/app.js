function formatTime(timestamp) {
    let currentTime = new Date(timestamp); 
 
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

    return `${currentDay} ${formatHours(timestamp)}`
}

function formatHours(timestamp) {
  let currentTime = new Date(timestamp); 
  let currentHours = currentTime.getHours();
  if (currentHours < 10)
      currentHours = `0${currentHours}`;
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10)
      currentMinutes = `0${currentMinutes}`;

  return `${currentHours}:${currentMinutes}`
}

function formatDate(){
    let now = new Date();
    let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ];
  
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
  
    currentDate = document.querySelector("#date");
    currentDate.innerHTML = `${date} ${month} ${year}`;
  }
  
formatDate()

function displayWeather(response) { 
    let temperatureElement = document.querySelector("#current-temperature"); 
    let cityElement=document.querySelector("#current-city");
    let descriptionElement=document.querySelector("#description");
    let pressureElement= document.querySelector("#pressure");
    let humidityElement= document.querySelector("#humidity");
    let windspeedElement= document.querySelector("#wind-speed");
    let timeElement=document.querySelector("#current-day-time");
    let iconElement=document.querySelector("#icon");
   
    celsiusTemperature = response.data.main.temp

    temperatureElement.innerHTML= Math.round(celsiusTemperature);
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

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=null; 
  let forecast=null;

  for (let index=0; index <=5; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML+=`
    	<div class="col-2">
        <ul class= "fivedaysforecast" id="forecast">
          <li class="forecast-time" id="time">${formatHours(forecast.dt*1000)}</li>
          <li class="graph"><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" class="forecast-graph"/></li>
          <li class="forecast-temperature">
          <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(forecast.main.temp_min)}°</li>      
        </ul>
      </div>
  `;
  }
} 

function search(city) {
   let apiKey = "a762ee58da3312e3b42c763f03cdad42";
   let units = `metric`;
   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
   axios.get(apiUrl).then(displayWeather);

   apiEndpoint2="https://api.openweathermap.org/data/2.5/forecast";
   apiUrl=`${apiEndpoint2}?q=${city}&units=${units}&appid=${apiKey}`;
   axios.get(apiUrl).then(displayForecast);
}

function submitCity(event) {
    event.preventDefault();
    cityinputElement = document.querySelector("#city-input");
    search(cityinputElement.value)
}

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

function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature* 9) / 5 + 32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement =document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

let celsiusTemperature = null;

let searchcityButton = document.querySelector("#search-city");
searchcityButton.addEventListener("submit", submitCity);
   
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Vienna")