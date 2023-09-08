
let now = new Date();

let hour= now.getHours();
let minutes= now.getMinutes();

let currentHour= document.querySelector("#current-time");
currentHour.innerHTML = `${hour}:${minutes}`


let days = [ 
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
let day =days[now.getDay()];

let months= [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month= months[now.getMonth()];

let year= now.getFullYear();
let date= now.getDate();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML= `${day}, ${month} ${date}, ${year}`;



function getLiveWeather(response){
document.querySelector(".cityInput").innerHTML = response.data.name;
document.querySelector("#switch-temp").innerHTML = `${Math.round(response.data.main.temp)}°`;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector(".weatherDescription").innerHTML = response.data.weather[0].main;
}



function search(localCity){
  let units = "imperial";
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${localCity}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(getLiveWeather);
}


function cityResponse(event){
event.preventDefault();
let localCity = document.querySelector("#find-weather").value;
search(localCity);
}


let citySubmit = document.querySelector("#enter-city");
citySubmit.addEventListener("submit", cityResponse);

search("Los Angeles");





function geoTrack(){

  function getCurrentTemperarture(response){
    let cityGeoTrack = response.data.name;
    let location = document.querySelector(".cityInput");
    location.innerHTML = cityGeoTrack;
    let tempGeoTrack = Math.round(response.data.main.temp);
    let temperature = document.querySelector(".mainTemperature");
    temperature.innerHTML = `${tempGeoTrack}°`;
  }
  
  function showCurrentLocation(position){
    console.log(position)
    let latitude = position.coords.latitude;
    let longitude= position.coords.longitude;
    let apiKeyGeoTrack = "197f9fd906875b61a67bac12da5e6cdb"
    let apiUrlGeoTrack = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=`
    axios.get(`${apiUrlGeoTrack}${apiKeyGeoTrack}&units=imperial`).then (getCurrentTemperarture);
  }
  
  navigator.geolocation.getCurrentPosition(showCurrentLocation);


}
let findCurrentLocation = document.querySelector(".findCurrentLocation");
findCurrentLocation.addEventListener("click", geoTrack)