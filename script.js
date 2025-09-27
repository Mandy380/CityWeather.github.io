async function getCityWeather() {
  const city = document.getElementById('name').value;
  const apiKey = '23311bd3097a594bc9e6c697cbd6df54'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
      document.getElementById('Results').innerHTML = result;
    } else {
      document.getElementById('Results').innerHTML = `<p>City not found.</p>`;
    }
  } catch (error) {
    document.getElementById('Results').innerHTML = `<p>Error fetching weather data.</p>`;
  }
}

