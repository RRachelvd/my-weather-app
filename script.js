function updateWeather(response) {
  let currentTemperature = response.data.temperature.current;
  let currentDescription = response.data.condition.description;
  let currentWind = response.data.wind.speed;
  let currentHumidity = response.data.temperature.humidity;
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let currentIcon = `<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png">`;

  iconElement.innerHTML = currentIcon;
  windElement.innerHTML = `${Math.round(currentWind)} km/h`;
  descriptionElement.innerHTML = currentDescription;
  humidityElement.innerHTML = `${currentHumidity}%`;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);

  console.log(response.data);
}

function formatDate(date) {
  let timeHours = date.getHours();
  let timeMinutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (timeHours < 10) {
    timeHours = `0${timeHours}`;
  }

  if (timeMinutes < 10) {
    timeMinutes = `0${timeMinutes}`;
  }

  return `${day} ${timeHours}:${timeMinutes}, `;
}

function searchCity(city) {
  let apiKey = "0c98c0be68f4tba31fe26f898obb603d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSumbit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="row">
  <div class="weather-forecast-day">${day}</div>
  <div class="weather-forecast-icon">⛅</div>
  <div class="weather-forecast-temperature">
     <span class="weather-forecast-temperature-max">18°  </span>
     <span class="weather-forecast-temperature-min">12°</span>
   </div>
</div>
    `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchSumbit);

searchCity("Leeuwarden");

displayForecast();
