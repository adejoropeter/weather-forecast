const apiKey = "8e5752469b1f77a6fd2996155a2586b4";
apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

searchBox = document.querySelector(".search input");
searchBtn = document.querySelector(".search button");
weatherIcon = document.querySelector(".weather-icon");
let errorMessage = "";

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(response);
    document.querySelector(".weather").innerHTML = ` <img src=${
      data.weather[0].main === "Clouds"
        ? (weatherIcon.src = "images/clouds.png")
        : data.weather[0].main === "Clear"
        ? (weatherIcon.src = "images/clear.png")
        : data.weather[0].main === "Rain"
        ? (weatherIcon.src = "images/clouds.png")
        : data.weather[0].main === "Drizzle"
        ? (weatherIcon.src = "images/drizzle.png")
        : weather[0].main === "Mist"
        ? (weatherIcon.src = "images/mist.png")
        : (weatherIcon.src = "images/snow.png")
    } class="weather-icon">
            <h1 class="temp">${Math.round(data.main.temp) + "°C"}</h1>
            <h2 class="city">${data.name}</h2>
            <div class="details">
                <div class="col">
                    <img src="images/humidity.png">
                    <div>
                        <p class="humidity">${data.main.humidity + "%"}</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="images/wind.png">
                    <div>
                        <p class="wind">${data.wind.speed + " km/h"}</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>`;

    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.log(error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").innerHTML =
      '<img src="images/refresh.png" class="weather-icon error-img">';
  }
}
searchBtn.addEventListener("click", () => {
  if (searchBox.value.length && !searchBox.value.includes(" ")) {
    checkWeather(searchBox.value.trim());
    searchBox.value = "";
  } else {
    alert(
      searchBox.value.includes(" ")
        ? "No space needed"
        : "Fill in the input field"
    );
    return;
  }
});
searchBox.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchBox.value);
  }
});
//Display Location
function displayLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8e5752469b1f77a6fd2996155a2586b4`
        )
          .then((response) => response.json())
          .then((data) => {
            var city = data.name;
            var state = data.sys.country;
            var locationElement = document.getElementById("displayLocation");
            locationElement.innerHTML = city + ", " + state;
          });
        console.log("").catch((error) => {
          console.log(error);
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by your browser.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  displayLocation();
});
