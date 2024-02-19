function displayTemperature(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let showTemperature = document.querySelector("#todays-temperature");
  showTemperature.innerHTML = `${currentTemperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
}

function searchResult(event) {
  event.preventDefault();
  let city = document.querySelector(".search-input");

  let key = "0c98c0be68f4tba31fe26f898obb603d";
  let cityInput = city.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minutes}`;
}

let search = document.querySelector("#search-city");
search.addEventListener("submit", searchResult);

let now = new Date();

let weatherToday = document.querySelector("#today");

weatherToday.innerHTML = formatTime(now);
