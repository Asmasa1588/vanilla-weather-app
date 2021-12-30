function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  const minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  const temperatureElement = document.querySelector("#temperature");

  const cityElement = document.querySelector("#city");

  const descriptionElement = document.querySelector("#description");

  const humidityElement = document.querySelector("#humidity");
  const windElement = document.querySelector("#wind");
  const dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

const apiKey = "c8396e2c418b55be7e0e0c31490694b7";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
