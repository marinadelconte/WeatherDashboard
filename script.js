let apiKey = "291f76a1b16ded2c803cb4e3fa8f978f";
let fetchButton = document.querySelector(".btn");
let cityName = document.querySelector("#cityName");
let temp = document.querySelector("#temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let search = document.querySelector("#search");
let userInput = document.querySelector("#userInput");
let rowElement = document.querySelector(".row");
let columnElement = document.querySelector(".column");
let cityHistoryElement = document.querySelector("#historyContainer");


function getCoordinates(event, city) {
    event.preventDefault();
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + userInput.value + "&limit=1&units=imperial&appid=" + apiKey)
        .then(response => response.json())
        .then(cityFound => {
            let searchCity = cityFound[0];
            let lat = searchCity.lat;
            let lon = searchCity.lon;
            return (getWeatherByCoordinates(lat, lon))
        })
    saveCity(userInput.value);
    renderHistory();
}

function historySearch (city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&units=imperial&appid=" + apiKey)
        .then(response => response.json())
        .then(cityFound => {
            let searchCity = cityFound[0];
            let lat = searchCity.lat;
            let lon = searchCity.lon;
            return (getWeatherByCoordinates(lat, lon))
        })
    }

function renderCurrentDay(data) {
    console.log(data)
    const html = `   <div class="card col-6" style="width: 32rem; height: 20rem;">
<div class="card-body">
        <h2 class="card-title">City: ${data.name}</h2>
        <h6 class="card-title">Date: ${dayjs().format("MM/DD/YYYY")}</h6>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
        <p class="card-title">Temp: ${data.main.temp}°F</p>
        <p class="card-text">Humidity: ${data.main.humidity}%</p>
        <p class="card-text">Wind Speed: ${data.wind.speed} mph</p>
</div>
</div>`
    columnElement.textContent = "";
    columnElement.insertAdjacentHTML("beforeend", html);
}


function renderFiveDays(data) {
    rowElement.textContent = "";
    for (let i = 0; i < data.list.length; i += 8) {
        console.log(data.list[i]);
        const html = `   <div class="card col-2" style="width: 16rem; height: 17rem;">
<div class="card-body">
        <h6 class="card-title">Date: ${data.list[i].dt_txt}</h6>
        <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png"/>
        <p class="card-title">Temp: ${data.list[i].main.temp}°F</p>
        <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
        <p class="card-text">Wind Speed: ${data.list[i].wind.speed} mph</p>
</div>
</div>`
        rowElement.insertAdjacentHTML("beforeend", html);
    }
}


function getWeatherByCoordinates(lat, lon) {
    console.log(lat, lon)
    fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey)
        .then(response => response.json())
        .then(data => {

            renderFiveDays(data);
            getCurrentWeather(lat, lon);
        })
}
search.addEventListener('click', getCoordinates)
console.log(userInput.value);

function getCurrentWeather(lat, lon) {
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey)
        .then(response => response.json())
        .then(data => {

            renderCurrentDay(data);

        })
}

function saveCity(city) {
    console.log(city);
    const cityHistory = JSON.parse(localStorage.getItem("history")) || [];
    cityHistory.push(city);
    console.log(cityHistory);
    localStorage.setItem("history", JSON.stringify(cityHistory));
}

function renderHistory() {
    const cityHistory = JSON.parse(localStorage.getItem("history")) || [];
    cityHistoryElement.textContent = "";
    for (let i = cityHistory.length - 1; i > 0; i--) {
        if (i > cityHistory.length - 6) {
            const button = document.createElement("button");
            button.textContent = cityHistory[i];
            button.addEventListener("click", function() {
                historySearch(cityHistory[i])
            } )
            cityHistoryElement.appendChild(button);
        }
    }
}
renderHistory();