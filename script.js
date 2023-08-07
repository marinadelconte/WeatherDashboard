let apiKey = "291f76a1b16ded2c803cb4e3fa8f978f";
let fetchButton = document.querySelector(".btn");
let cityName = document.querySelector("#cityName");
let temp = document.querySelector("#temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let search = document.querySelector("#search");
let userInput = document.querySelector("#userInput");
let rowElement = document.querySelector(".row");


function getCoordinates(event) {
event.preventDefault();
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+userInput.value+"&limit=1&units=imperial&appid="+apiKey)
    .then(response => response.json())
    .then(cityFound => {
        let searchCity = cityFound[0];
        let lat = searchCity.lat;
        let lon = searchCity.lon;
        return(getWeatherByCoordinates(lat, lon)) 
    })

}

function renderFiveDays(data){
for (let i = 0; i < data.list.length; i= i+8) {
    console.log(data.list[i]);
const html= `   <div class="card col-2" style="width: 16rem; height: 17rem;">
<div class="card-body">
    <h5 class="card-title">Date: ${data.list[i].dt_txt}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Temp:</h6>
    <p class="card-text">Humidity:</p>
    <p class="card-text">Wind Speed:</p>
</div>
</div>`   
rowElement.insertAdjacentHTML("beforeend", html);
}
}



function getWeatherByCoordinates(lat, lon) {
    console.log(lat, lon)
    fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {

    console.log(data);
    renderFiveDays(data);
        //first card
        console.log(data.list[0].main.temp)
        console.log(data.list[0].main.humidity)
        console.log(data.list[0].wind.speed)

        temp.textContent = `Temperature: ${data.list[0].main.temp} degrees`

        
        //second card
        //console.log(data.list[8])

        //third card
        //console.log(data.list[16])

        //fourth card
        //console.log(data.list[24])

        //fifth card
       //console.log(data.list[32])

        //sixth card 
       //console.log(data.list[39])

        
      
})
}
search.addEventListener('click', getCoordinates) 
console.log(userInput.value);