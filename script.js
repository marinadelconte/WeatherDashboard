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

        //first card
        console.log(data.list[0])
        

        console.log(`  <div class="card" style="width: 16rem; height: 17rem;">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
        </div>
    </div>`)


        //second card
        console.log(data.list[8])

        //third card
        console.log(data.list[16])

        //fourth card
        console.log(data.list[24])

        //fifth card
        console.log(data.list[32])

        //sixth card 
        console.log(data.list[40])

        
      
})
}
fetchButton.addEventListener('click', function(getCoordinates) {
getCoordinates.preventDefault();

})