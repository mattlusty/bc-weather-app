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

## 5 day (3 hours intervals) (FREE)

### Description

Provides 5 day projection in 3 hour intervals

### Webpage:

https://openweathermap.org/forecast5

### API Calls

By Geo-Coords:
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_key}

By City Name:
https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={API_key}

## Current Weather (FREE)

### Description

For accessing the current weather (ie today / now)

### Webpage:

https://openweathermap.org/current

### API Calls

By Geo-Coords:
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}

By City Name:
https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_key}

## Daily Forecast 16 Days (PREMIUM)

### Description

Provides 16 day weather forecast with _daily average_ parameters

### Webpage:

https://openweathermap.org/forecast16

### API Calls

https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API_key}

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

## Request Specific Units

Temperature is available in Fahrenheit, Celsius and Kelvin units.

- For temperature in Fahrenheit use units=imperial
- For temperature in Celsius use units=metric
- Temperature in Kelvin is used by default, no need to use units parameter in API call
- List of all API parameters with units https://openweathermap.org/weather-data

## Weather Icons

https://openweathermap.org/weather-conditions

https://www.svgrepo.com/collection/weather-line-icons
