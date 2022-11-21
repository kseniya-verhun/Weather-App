/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter a city?");
city = city.toLowerCase();
if (weather[city] !== undefined) {
    let temp = weather[city].temp;
    let humidity = weather[city].humidity;
    let tempF = weather[city].temp * 1.8 + 32;
    alert(`It is currently ${Math.round(temp)}°C (${Math.round(tempF)}°F) in ${city} with a humidity of ${humidity}%`);
} else {
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
}*/

let now = new Date();
let time = document.querySelector(".time");
time.innerHTML = now.getHours() + ":" + now.getMinutes();
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

  
function convertTemperatureC(event) {
  event.preventDefault();
  let convert = document.querySelector("#temperature");
  convert.innerHTML = 23;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertTemperatureC);

function convertTemperatureF(event) {
  event.preventDefault();
  let convert = document.querySelector("#temperature");
  convert.innerHTML = 73;
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

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

function showWeather(response) {
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;
  
  let city = document.querySelector("h2");
  city.innerHTML = `${response.data.name}`;
  
  let weatherDescription = document.querySelector("h3");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let weatherHumidity = document.querySelector("#humidity-value");
  weatherHumidity.innerHTML = `${response.data.main.humidity}`;

  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = `${response.data.wind.speed}`;
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  if (cityInput.value.length>0) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    alert(`Please enter your city...`)
    }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

function retrievePosition(position) {
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

