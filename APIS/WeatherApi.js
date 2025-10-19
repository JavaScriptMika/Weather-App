const apiKey = "055a2d5042e74efe230cbe18f68df938";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  document.querySelector(".start-screen").classList.add("hidden");
  document.querySelector(".weather-screen").classList.remove("hidden");
  getWeather();
});

function getWeather() {
  const city = document.querySelector("#enter-city").value.trim();
  if (!city) {
    alert("Please enter a city!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById("condition").textContent = data.weather[0].description;
      document.getElementById("range").textContent = `Max: ${Math.round(data.main.temp_max)}°C | Min: ${Math.round(data.main.temp_min)}°C`;

      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById("sunrise").textContent = sunrise;
    })
    .catch(error => {
      document.getElementById("condition").textContent = "Error loading weather data.";
      console.error("Error fetching weather data:", error);
    });
}
