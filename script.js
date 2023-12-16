let searchInput = $("#search-input");
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
let appId = "&appid=9397f4c4feeadfc01afd4e19fa302fb4";

let history = [];

// Elements
let forecastSection = $("#forecast");

let searchButton = $("#search-button").on("click", function (event) {
  event.preventDefault();

  let city = searchInput.val();
  let cityQuery = "&q=" + city;

  // let queryUrl = baseUrl + appId + cityQuery;

  let queryUrl = baseUrl + appId + cityQuery;
  history.push(city);

  console.log(queryUrl);

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let items = data.list;
      console.log(items);
      let days = [];

      let loopDay = dayjs().format("dddd");
      let loopDayIndex = 0;

      console.log("First loopDay: ", loopDay);

      for (let i = 0; i < items.length; i++) {
        console.log("i: ", i);

        let item = items[i];

        let dateSeconds = item.dt;
        let dateMilliseconds = dateSeconds * 1000;
        let date = dayjs(dateMilliseconds);
        let weekDay = date.format("dddd");

        let tempKelvin = item.main.temp;
        let tempCelcius = tempKelvin - 273.1;
        // Below does similar as toFixed() but with an integer return (instead of string return)
        let temp = toFixedNumber(tempCelcius, 2);
        console.log("temp: ", temp);

        let wind = item.wind.speed;
        let humidity = item.main.humidity;

        console.log("wind: ", wind);

        // console.log("weekDay: ", weekDay);
        // console.log("loopDay: ", loopDay);
        // console.log("loopDayIndex: ", loopDayIndex);
        // console.log("weekDay == loopDay: ", weekDay == loopDay);

        // Check if new weekDay
        if (!(weekDay == loopDay)) {
          // If this happens during first iteration, no need to increment loopDayIndex (days[] array will be empty)
          if (i > 0) loopDayIndex++;
          // Advance weekDay regardless
          loopDay = weekDay;
          // Create new object array for new weekDay
          days[loopDayIndex] = { day: weekDay, temps: [], winds: [], humidities: [] };
        }

        let day = days[loopDayIndex];
        day.temps.push(temp);
        day.winds.push(wind);
        day.humidities.push(humidity);

        // renderDay(day); // NOT NEEDED HERE (Except for testing)
      }
      console.log("days: ", days);
      let dailyAverages = getDailyAverages(days);
      renderDays(dailyAverages);
    });
});

function renderDays(days) {
  days.forEach(function (day) {
    renderDay(day);
  });
}

function renderDay({ day, temp, wind, humidity }) {
  // Construct elements
  let forecastElement = $("<div>");
  let weekDayElement = $("<div>").text(day);
  let tempElement = $("<div>").text(temp);
  let windElement = $("<div>").text(day);
  let humidityElement = $("<div>").text(humidity);
  // Apply classes
  forecastElement.addClass("col m-2 border border-dark");
  // Construct
  forecastElement.append(weekDayElement, tempElement, windElement, humidityElement);
  // Append to DOM
  forecastSection.append(forecastElement);
}

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
    let humidityAverage = toFixedNumber(windSum / dataLength, 2);

    return { day: day, temp: tempAverage, wind: windAverage, humidity: humidityAverage };
  });
  // console.log("dayAverages: ", dayAverages);
  return dayAverages;
}

function toFixedNumber(number, exponent) {
  return Math.round(number * Math.pow(10, exponent)) / 100;
}
