function updateWeather(response) {
  console.log(response.data.temperature.current);
  let currentTemperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#weather-app-temperature");
  temperatureElement.innerHTML = Math.round(currentTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
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
