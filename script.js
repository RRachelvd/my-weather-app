function searchCityWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", searchCityWeather);
