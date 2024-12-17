const inputSearch = document.querySelector(".search");
// console.log(inputSearch);
const api = {
  baseUrl: "https://api.weatherapi.com",
  endpoint: "v1/forecast.json",
  apiKey: "ae7f613db1a24e1484c163047241106",
  day: 3
};
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthNames = [
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
inputSearch.addEventListener("input", function(event) {
  getSearchWeather(event.target.value);
});
document.querySelector(".btnClicked").addEventListener("click", function(event) {
  clearInput()
})
// function get weather todays
async function getSearchWeather(value) {
  let req = await fetch(
    `${api.baseUrl}/${api.endpoint}?key=${api.apiKey}&q=${value}&days=${api.day}`
  );
  console.log(req);
  if (req.ok && req.status !== 400) {
    let data = await req.json();
    displayCurrentToDay(data.location, data.current);
    displayForecastDay(data.forecast.forecastday);
  }
}
getSearchWeather("cairo");
// function display the user weather today
function displayCurrentToDay(location, current) {
  let date = new Date(current.last_updated);
  // console.log(e);
  let currentWeather = `
                          
            
                            <div class="forecast-header d-flex justify-content-between p-3 ">
                                    <span class="day ">${days[
                                      date.getDay()
                                    ]}</span>
                                    <span class="date">${date.getDate() +
                                      monthNames[date.getMonth()]}</span>
                                </div>
                                <div class="forecast-content  pb-3 ps-3">
                                    <div class="location ">${location.name}</div>
                                    <div class="degree text-white">
                                        <div class="number  ">
                                           ${current.temp_c}
                                            <sup>o</sup>
                                            C
                                        </div>
                                        <div class="forecast-icon">
                                            <img src="https:${current.condition
                                              .icon}" alt=""
                                                width="90">
                                        </div>
                                    </div>
                                    <div class="custom mb-3">${current.condition
                                      .text}</div>
                                    <span>
                                        <img src="./images/icon-umberella.png" alt="">
                                        20%
                                    </span>
                                    <span>
                                        <img src="./images/icon-compass.png" alt="">
                                        East
                                    </span>
                                    <span>
                                        <img src="./images/icon-wind.png" alt="">
                                        18km/h
                                    </span>
                                </div>
                       

  `;
  document.querySelector(".today-forecast ").innerHTML = currentWeather;
}
// function getWeather next+ tow days
function displayForecastDay(forecastDay) {
  let forecast = "";
  for (let i = 1; i < forecastDay.length; i++) {
    let data = new Date(forecastDay[i].date);
    console.log(forecastDay[i]);
    forecast += `
                                        <div class="col-lg-6  forecast">
                                        <div class="forecast-next mt-3 ">
                                            <div class="forecast-header text-center p-3 ">
                                                <span class="day">${days[
                                                  data.getDay()
                                                ]}</span>
                                                 <span class="date">${data.getDate() +
                                                   " " +
                                                   monthNames[
                                                     data.getMonth()
                                                   ]}</span>
                                            </div>
                                            <div class="pb-3 ps-3 d-flex text-center justify-content-center flex-column align-items-center">
                                                <div class="degree text-white">
                                                    <div class="number  p-5 ">
                                                       ${forecastDay[i].day
                                                         .maxtemp_c}
                                                        <sup>o</sup>
                                                        c
                                                        <br>
                                                        <small class="lead">${forecastDay[
                                                          i
                                                        ].day
                                                          .mintemp_c}<sup>o</sup> c</small>
                                                    </div>
                                                    <div class="forecast-icon">
                                                        <img src="https:${forecastDay[
                                                          i
                                                        ].day.condition
                                                          .icon}" alt="" width="90">
                                                    </div>
                                                </div>
                                                <div class="custom py-5">${forecastDay[
                                                  i
                                                ].day.condition.text}</div>
                                            </div>
                                        </div>
                                    </div>
    `;
  }
  document.querySelector(".row-2").innerHTML = forecast;
}

const cities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Qalyubia",
  "Dakahlia",
  "Sharqia",
  "Menofia",
  "Gharbia",
  "Ismailia",
  "Port Said",
  "Suez",
  " Sinai",
  "Red Sea",
  "Valley",
  "Matruh",
  "Minya",
  "Asyut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
  "Beheira",
  "Fayoum",
  "Kafr El Sheikh",
  "Beni Suef"
];
const displayCites = function(){
let result = "";
for (let i = 0; i < cities.length; i++) {
  console.log(cities[i]);
  result += `
            <option value="${cities[i]}"/>

  `;
  document.getElementById("category").innerHTML = result;
}
}

displayCites();

const clearInput = function(){
  inputSearch.value = '';
}