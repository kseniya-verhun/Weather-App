let now = new Date();
let time = document.querySelector(".time");
//time.innerHTML = now.getHours() + ":" + now.getMinutes();
function formatTime(date) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`
}
if (hours < 10) {
  hours = `0${hours}`
}
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}
time.innerHTML = formatTime(now);

let date = document.querySelector(".date");
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}`;
  return formattedDate;
}
date.innerHTML = formatDate(now);


let celsiusTemperature = null;
  
function convertTemperatureC(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertTemperatureC);

function convertTemperatureF(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertTemperatureF);

/*function convertTemperature(event) {
  event.preventDefault();
  let temp = document.getElementById("temperature").innerHTML;
  if (temp === "23°C") {
    document.getElementById("temperature").innerHTML = "72°F"
  } else {
    document.getElementById("temperature").innerHTML = "23°C"
  }
}*/


function showWeather(response) {
  let currentTemperature = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  currentTemperature.innerHTML = `${temperature}`;
  
  let city = document.querySelector("h2");
  city.innerHTML = `${response.data.name}`;
  
  let weatherDescription = document.querySelector("h3");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let weatherHumidity = document.querySelector("#humidity-value");
  weatherHumidity.innerHTML = `${response.data.main.humidity}`;

  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = `${response.data.wind.speed}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function api(cityInput) {
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
  axios.get(apiLink).then(showWeather);
  }

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  if (cityInput.value.length>0) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityInput.value;
    api(cityInput.value);
  } else {
    alert(`Please enter your city...`)
    }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);


function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let button = document.querySelector("button.current-city");
button.addEventListener("click", getLocation);


api("New York");