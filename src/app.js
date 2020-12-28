function formatDate(timestamp) {
    let date = new Date(timestamp); 
    let hours = date.getHours();
    if (hours < 10) {
        `0${hours}`
    };
    let minutes = date.getMinutes();
    if (minutes < 10) {
        `0${minutes}`
    };
    let days= [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`
}

function displayWeather(response) { 
    let temperatureElement = document.querySelector("#current-temperature"); 
    let cityElement=document.querySelector("#current-city");
    let descriptionElement=document.querySelector("#description");
    let pressureElement= document.querySelector("#pressure");
    let humidityElement= document.querySelector("#humidity");
    let windspeedElement= document.querySelector("#wind-speed");
    let dateElement=document.querySelector("#current-day-time");
    let iconElement=document.querySelector("#icon");
   
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    cityElement.innerHTML= response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description; 
    pressureElement.innerHTML = response.data.main.pressure;
    humidityElement.innerHTML=response.data.main.humidity;
    windspeedElement.innerHTML= Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
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
   search("Vienna")
   
   let form = document.querySelector("#search-city")
   form.addEventListener("submit", submitCity)

  