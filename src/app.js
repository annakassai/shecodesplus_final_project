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
   
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    cityElement.innerHTML= response.data.main.name;
    descriptionElement.innerHTML=response.data.weather[0].description; 
    pressureElement.innerHTML = response.data.main.pressure;
    humidityElement.innerHTML=response.data.main.humidity;
    windspeedElement.innerHTML= Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
}
   
   let apiKey = "a762ee58da3312e3b42c763f03cdad42";
   let units = `metric`;
   let city = "London";
   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
   console.log(apiUrl);
   
   axios.get(apiUrl).then(displayWeather);
