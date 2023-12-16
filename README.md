# weather-app-bc

Bootcamp Module 8 Challenge

# Issues

Open Weather Map "5 day - each 3 hours" API has limitations that affect this challenges requirements

1. Within the last 3 hours of the day... we won't recieve any weather for "today"

- (POSS SOLUTION: Use "Current Weather API")

2. This API gives 8 data points for each day, meaning ...

- we either have to select a random data point to represen as the whole day (which is terribly inaccurate and misleading)
- OR
- we have to implement some more complex javascipt to process an average for each day (which I don't believe was an intended depth to this challenge)

3. The API documentation says the date time it provides is in units of "unix, UTC"

- I thought this was milliseconds (like Javascript uses!)
- but alas after hours of head banging I now realise UTC is generally in seconds!

# APIs

## 5 day (per 3 hours) (FREE)

### Description

Provides 5 day projection in 3 hour intervals

### Webpage:

https://openweathermap.org/forecast5

### API Calls

API Call (by Geo-Coords):
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_key}

## One Call 3 (PREMIUM)

### Description

API endpoints for...

1. Current weather and forecasts:

- minute forecast for 1 hour
- hourly forecast for 48 hours
- daily forecast for 8 days

2. Weather data for any timestamp (for historical and 4 days ahead forecast)

### Webpage:

https://openweathermap.org/api/one-call-3

## Current Weather (FREE)

### Description

For accessing the current weather (ie today / now)

### Webpage:

https://openweathermap.org/current

### API Calls

API Call (by Geo-Coords):
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}

API Call (by City Name):
https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_key}
