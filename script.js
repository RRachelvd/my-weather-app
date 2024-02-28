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

  windElement.innerHTML = `${Math.round(currentWind)} km/h`;
  descriptionElement.innerHTML = currentDescription;
  humidityElement.innerHTML = `${currentHumidity}%`;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
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

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchSumbit);

searchCity("Leeuwarden");
