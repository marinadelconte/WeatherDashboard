let apiKey = "291f76a1b16ded2c803cb4e3fa8f978f";
let city;

///add entire fetch into an event listener




// fetch("https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=291f76a1b16ded2c803cb4e3fa8f978f")
// .then(response => response.json())
// .then(citiesFound => {
//     let firstCity = citiesFound[0];

//     console.log(firstCity.lat);
//     console.log(firstCity.lon);

//     return fetch("")
// })
// .then(response => response.json())
// .then(data => {

//     console.log(data);
// })

function get_lat_long(city_name, state_code, country_code) {
    let cityFound = fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city_name+","+state_code+","+country_code+"&limit=1&appid=291f76a1b16ded2c803cb4e3fa8f978f");
    console.log(cityFound);
}

get_lat_long("Miami", "FL", "US");

