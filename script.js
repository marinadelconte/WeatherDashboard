

///add entire fetch into an event listener

fetch("")
.then(response => response.json())
.then(citiesFound => {
    let firstCity = citiesFound[0];

    console.log(firstCity.lat);
    console.log(firstCity.lon);

    return fetch("")
})



.then(response => response.json())
.then(data => {

    console.log(data);
})