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

      let days = [[]];
      console.log("days: ", days);
      let loopDay = dayjs().format("dddd");
      let loopDayIndex = 0;

      console.log("First loopDay: ", loopDay);

      // 5 items = next 15 hours
      for (let i = 0; i < items.length; i++) {
        console.log("i: ", i);

        let item = items[i];

        let dateSeconds = item.dt;
        let dateMilliseconds = dateSeconds * 1000;
        let date = dayjs(dateMilliseconds);
        let weekDay = date.format("dddd");
        // let hour = date.format("HH:00"); // DELETE

        let tempKelvin = item.main.temp;
        let temp = (tempKelvin - 273.15).toFixed(2);

        let day = { day: weekDay, temp: temp };

        console.log("weekDay: ", weekDay);
        console.log("loopDay: ", loopDay);
        console.log("weekDay == loopDay: ", weekDay == loopDay);

        if (!(weekDay == loopDay)) {
          console.log("new day!");
          loopDayIndex++;
          loopDay = weekDay;
          days[loopDayIndex] = [];
        }

        days[loopDayIndex].push(day);

        renderDay(day);
      }
    });
});

function renderDay({ day, temp, wind, humidity }) {
  // Construct elements
  let forecastElement = $("<div>");
  let weekDayElement = $("<div>").text(day);
  let tempElement = $("<div>").text(temp);
  let windElement = $("<div>").text(day);
  let himidityElement = $("<div>").text(humidity);
  // Apply classes
  forecastElement.addClass("col m-2 border border-dark");
  // Construct
  forecastElement.append(weekDayElement, tempElement, windElement, himidityElement);
  // Append to DOM
  forecastSection.append(forecastElement);
}
