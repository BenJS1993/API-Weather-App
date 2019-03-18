const geocode = require("./geocode");
const forecast = require("./forecast");

const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
} else {
  geocode(address, (error, response) => {
    if (error) {
      return console.log(error);
    }

    forecast(response.latitude, response.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(response.location);
      console.log(forecastData);
    });
  });
}

module.exports = weather;
