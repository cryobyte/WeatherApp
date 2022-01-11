// gathering api information 
let  api = {
    key: "34c39ba493566250fb740c4f3e8fb3b7",
    base: "https://api.openweathermap.org/data/2.5/"
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
    // let country= weather.sys.country;

    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    var diff = d.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() + diff);
    console.log(currentDate);    
    
    let PmorAm, PmorAm_utc;

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
    let utc_time_hrs = currentDate.getHours();
    let utc_time_min = currentDate.getMinutes();

    if(utc_time_hrs > 12){
        PmorAm_utc = "PM";
        hours-=12;
    }
    else 
        PmorAm_utc = "AM";
    if(utc_time_min < 10){
        utc_time_min = '0' + minutes;
    }
    let utc_time = currentDate.getHours() + ":" + currentDate.getMinutes();

    console.log(time);    
    console.log(utc_time);    
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year} ${"/"} ${time} ${PmorAm} ${"EST"} ${"|"} ${utc_time} ${PmorAm_utc} ${"UTC"} `;
}
