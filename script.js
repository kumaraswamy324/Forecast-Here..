// Weather Forecast Application

// Main function to fetch and display weather data
function letforcast() {
    // API key for OpenWeatherMap
    const apiKey = '2421473703f81689a470c0592d17784a';

    // Get the city input from the user
    const city = document.getElementById('city').value;

    // Check if city is empty
    if (!city) {
        alert('Please enter a city');
        return;
    }

    // URLs for current weather and forecast data
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data); // Call function to display current weather
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data . Please check your internet connection and try again.');
        });

    // Fetch 5-day/3-hour forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list); // Call function to display hourly forecast
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please check your internet connection and try again.');
        });
}

// Function to display current weather information
function displayWeather(data) {
    // Get references to DOM elements
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    // If city is not found, display error message
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        // Extract weather details
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
        const description = data.weather[0].description.toLowerCase();
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Create HTML for temperature and weather information
        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        // Set weather icon
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Change background based on weather
        changeBackground(description);

        // Show weather icon
        showImage();
    }
}

// Function to display hourly forecast (next 24 hours)
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Get next 24 hours (8 items, 3-hour intervals)
    const next24Hours = hourlyData.slice(0, 8);

    // Loop through forecast data and create HTML
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert Unix timestamp to JS date
        const hour = dateTime.getHours(); // Get the hour (0-23)
        const temperature = Math.round(item.main.temp - 273.15); // Convert from Kelvin to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        // Create HTML for each forecast item
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        // Append forecast item to the container
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

// Function to change background based on weather description
function changeBackground(description) {
    const body = document.body;

    if (description.includes('clear')||description.includes('sunny')) {
        body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (description.includes('cloud')||description.includes('fog')||description.includes('haze')||description.includes('overcast')) {
        body.style.backgroundImage = "url('images/cloud.jpeg')";
    } else if (description.includes('rain')||description.includes('drizzle')||description.includes('shower')) {
        body.style.backgroundImage = "url('images/rain.jpeg')";
    } else if (description.includes('snow')||description.includes('sleet')) {
        body.style.backgroundImage = "url('images/snow.jpeg')";
    } else if (description.includes('thunderstorm')||description.includes('storm')) {
        body.style.backgroundImage = "url('images/thunderstorm.jpeg')";
    } 
   
    else {
        body.style.backgroundImage = "url('forecast.jpeg')";
    }

    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
}

// Function to display the weather icon
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible
}
