// function formatDate(timestamp) {
//   const date = new Date(timestamp);
//   const hours = date.getHours();

//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   const minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const day = days[date.getDay()];
//   return `${day} ${hours}:${minutes}`;
// }

// function displayTemperature(response) {
//   console.log(response.data);
//   const temperatureElement = document.querySelector("#temperature");

//   const cityElement = document.querySelector("#city");

//   const descriptionElement = document.querySelector("#description");

//   const humidityElement = document.querySelector("#humidity");
//   const windElement = document.querySelector("#wind");
//   const dateElement = document.querySelector("#date");
//   temperatureElement.innerHTML = Math.round(response.data.main.temp);
//   cityElement.innerHTML = response.data.name;
//   descriptionElement.innerHTML = response.data.weather[0].description;
//   humidityElement.innerHTML = response.data.main.humidity;
//   windElement.innerHTML = Math.round(response.data.wind.speed);
//   dateElement.innerHTML = formatDate(response.data.dt * 1000);
// }

// const apiKey = "c8396e2c418b55be7e0e0c31490694b7";
// const city = "New York";
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// console.log(apiUrl);
// axios.get(apiUrl).then(displayTemperature);

// const form = document.querySelector("#search-form");
// form.addEventListener("submit", search);

const DEFAULT_UNIT = "imperial";
selectedUnit = DEFAULT_UNIT;

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);

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
  return `${day} ${formatAMPM(date)}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}?? </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}?? </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c8396e2c418b55be7e0e0c31490694b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${selectedUnit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  const temperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

const unitToMetricSignMapper = {
  metric: "??C",
  imperial: "??F",
};

function toggleUnits() {
  const tempUnitElement = document.getElementById("temperature-unit");
  const newUnit = selectedUnit === "imperial" ? "metric" : "imperial";
  const newMetricSign = unitToMetricSignMapper[newUnit];

  selectedUnit = newUnit;
  tempUnitElement.innerHTML = newMetricSign;
  const cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value || "New York");
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${selectedUnit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");

// `<div>`
