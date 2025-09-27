const apiKey = "efd45479fda1f5545359c68bb106f228"; // <-- Apna API key daalo


async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}


function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }, error => {
      alert("Location access denied. Please allow location.");
    });
  } else {
    alert("Geolocation not supported in this browser.");
  }
}


async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found!");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weather").innerHTML = `<p>${error.message}</p>`;
  }
}


function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <div class="temp">${Math.round(data.main.temp)}°C</div>
    <div class="details">
      🌡️ Feels Like: ${Math.round(data.main.feels_like)}°C <br>
      💧 Humidity: ${data.main.humidity}% <br>
      🌬️ Wind: ${data.wind.speed} m/s <br>
      ☀️ Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()} <br>
      🌙 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}
    </div>
  `;
}
