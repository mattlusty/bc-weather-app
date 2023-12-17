let searchInput = $("#search-input");
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
let appId = "&appid=9397f4c4feeadfc01afd4e19fa302fb4";

// Search History (cities)
let history = [];

// Elements
let forecastSection = $("#forecast");

// Search Event Handler
let searchButton = $("#search-button").on("click", function (event) {
  event.preventDefault();

  // Get user input
  let city = searchInput.val();

  // Construct queryUrl
  let cityQuery = "&q=" + city;
  let queryUrl = baseUrl + appId + cityQuery;

  // Fetch Request
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let items = data.list;

      // Initiate variables for looping over weather data
      let loopDayIndex = 0;
      let loopDay = getWeekDay(items[0].dt);
      let days = [{ day: loopDay, temps: [], winds: [], humidities: [] }];

      for (let i = 0; i < items.length; i++) {
        let item = items[i];

        console.log(i);

        // Get Day Value from the Data Point
        let weekDay = getWeekDay(item.dt);

        // Get weather data from the Data Point
        let tempKelvin = item.main.temp;
        let tempCelcius = tempKelvin - 273.1;
        let temp = toFixedNumber(tempCelcius, 2);
        //
        let wind = item.wind.speed;
        let humidity = item.main.humidity;

        console.log("weekDay: ", weekDay);
        console.log("loopDay: ", loopDay);
        console.log("weekDay == loopDay: ", weekDay == loopDay);

        // Check if day is a newday from last
        if (!(weekDay == loopDay)) {
          console.log("new day!");
          // Advance weekDay
          loopDayIndex++;
          loopDay = weekDay;
          // Create new object array for new weekDay
          days[loopDayIndex] = { day: weekDay, temps: [], winds: [], humidities: [] };
        }

        // Add this data point's weather data to current loopDay
        let day = days[loopDayIndex];
        day.temps.push(temp);
        day.winds.push(wind);
        day.humidities.push(humidity);
      }

      // Now get averages from each days data points
      let dailyAverages = getDailyAverages(days);
      console.log("dailyAverages: ", dailyAverages);

      // Render in DOM
      renderDays(dailyAverages);

      updateHistory(city);
    });
});

// Functions

function getDailyAverages(days) {
  let dayAverages = days.map(function (day) {
    let dataLength = day.temps.length;

    let tempSum = 0;
    day.temps.forEach(function (temp) {
      tempSum += temp;
    });

    let windSum = 0;
    day.winds.forEach(function (wind) {
      windSum += wind;
    });

    let humiditySum = 0;
    day.humidities.forEach(function (humidity) {
      humiditySum += humidity;
    });

    let tempAverage = toFixedNumber(tempSum / dataLength, 2);
    let windAverage = toFixedNumber(windSum / dataLength, 2);
    let humidityAverage = toFixedNumber(humiditySum / dataLength, 2);

    return { day: day.day, temp: tempAverage, wind: windAverage, humidity: humidityAverage };
  });
  return dayAverages;
}

function renderDays(days) {
  days.forEach(function (day) {
    renderDay(day);
  });
}

function renderDay(day) {
  ({ day, temp, wind, humidity } = day);
  console.log(day);
  // Construct elements
  let forecastElement = $("<div>");
  let weekDayElement = $("<div>").text(day);
  let tempElement = $("<div>").text("Temp: " + temp);
  let windElement = $("<div>").text("Wind: " + wind);
  let humidityElement = $("<div>").text("Humidity: " + humidity);
  // Apply classes
  forecastElement.addClass("col m-2 border border-dark");
  // Construct
  forecastElement.append(weekDayElement, tempElement, windElement, humidityElement);
  // Append to DOM
  forecastSection.append(forecastElement);
}

function updateHistory(city) {
  // Add to history array
  history.push(city);
  // Add to localstorage
  localStorage.set("history", JSON.stringify(history));
}

// UTILITY FUNCTIONS

function getWeekDay(seconds) {
  let dateMilliseconds = seconds * 1000;
  let date = dayjs(dateMilliseconds);
  return date.format("dddd");
}

// Similar as Math.toFixed() but with an integer return (instead of string return)
function toFixedNumber(number, exponent) {
  return Math.round(number * Math.pow(10, exponent)) / 100;
}
