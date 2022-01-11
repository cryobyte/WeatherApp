// gathering api information 
const  api = {
    key: "34c39ba493566250fb740c4f3e8fb3b7",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        fetch(`${api.base}weather?q=${searchbox.value}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayInfo);
    }
} 
// fetching city, date, temperature and weather info
function displayInfo (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let currentDate = new Date();
    let dateAndTime = document.querySelector('.location .date');
    dateAndTime.innerText = dateCreator(currentDate);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
// builds the date and time
function dateCreator (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let PmorAm;

    if(hours > 12){
        PmorAm = "PM";
        hours-=12;
    }
    else 
        PmorAm = "AM";
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    let time = hours + ":" + minutes;
    console.log(time);    

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year} ${"/"} ${time} ${PmorAm}`;
}
