let searchInput = $("#search-input");
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";

let appId = "&appid=9397f4c4feeadfc01afd4e19fa302fb4";

let history = [];

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
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      let items = data.list;
      // 5 items = next 15 hours
      for (let i = 0; i < 5; i++) {
        let item = items[i];
        let day = dayjs(item.dt * 1000).format("YYYY-MM-DD HH:mm");
        console.log(day);
      }
    });
});
