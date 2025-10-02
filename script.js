async function getCityWeather() {
  const city = document.getElementById('name').value.trim();
  const resultsDiv = document.getElementById('Results');
  const button = document.querySelector('button');

  // Clear previous results
  resultsDiv.innerHTML = '';

  // Check for empty input
  if (city === '') {
    resultsDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiKey = '23311bd3097a594bc9e6c697cbd6df54'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  try {
    // Disable the button while loading
    button.disabled = true;
    button.innerText = 'Loading...';

    const response = await fetch(url);

    if (!response.ok) {
      // Handle known errors (e.g., 404 city not found)
      const errorData = await response.json();
      resultsDiv.innerHTML = `<p>${errorData.message || 'Failed to fetch weather data.'}</p>`;
    } else {
      const data = await response.json();
      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
      resultsDiv.innerHTML = result;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p>Network error. Please try again later.</p>`;
  } finally {
    // Re-enable the button
    button.disabled = false;
    button.innerText = 'Search Weather';
  }
}



