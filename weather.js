const apiKey = "6e215ca3ecd2698396565b4fdca8542f";
const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML =
                Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML =
                data.main.humidity + "%";
            document.querySelector(".wind").innerHTML =
                data.wind.speed + " km/h";

            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }

            weather.style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

searchbox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchbox.value);
    }
});
