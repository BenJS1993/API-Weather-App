const express = require("express");
const path = require("path");
const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();

const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

// let benfavourite = {
//   game: "Banjo-Kazooie",
//   film: "Alien",
//   tvshow: "Scrubs"
// };

// app.get("", (req, res) => {
//   res.send("<h1>Hi my name is Ben</h1>");
// });

// app.get("/Colour", (req, res) => {
//   console.log(req.query);
//   res.send("<h2>My favourite colour is red</h2>");
// });

// app.get("/benfavourite", (req, res) => {
//   res.send(benfavourite);
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please search for an address");
  }

  if (!req.query.address) {
    console.log("Please provide an address");
  } else {
    geocode(req.query.address, (error, response) => {
      if (error) {
        return console.log(error);
      }

      forecast(response.latitude, response.longitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        } else {
          res.send({
            location: response.location,
            forecast: forecastData
          });
          // console.log(response.location);
          // console.log(forecastData);
        }
      });
    });
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
