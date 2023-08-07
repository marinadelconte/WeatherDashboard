let apiKey = "291f76a1b16ded2c803cb4e3fa8f978f";
let fetchButton = document.querySelector(".btn");


getCoordinates("Miami", "FL", "US");


function getCoordinates(city_name, state_code, country_code) {

    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city_name+","+state_code+","+country_code+"&limit=1&appid="+apiKey)
    .then(response => response.json())
    .then(cityFound => {
        let searchCity = cityFound[0];
        let lat = searchCity.lat;
        let lon = searchCity.lon;
        return(getWeatherByCoordinates(lat, lon)) 
    })

}

function getWeatherByCoordinates(lat, lon) {
    console.log(lat, lon)
    fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {

        console.log(data.list)
        // let temp = weather.temp;
        // let wind = weather[list.wind.speed];
        // let humidity = weather[list.main.humidity];
})
}
fetchButton.addEventListener('click', function() {

})