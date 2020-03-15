const _ = require("lodash");

const { getCountryVisasJSON } = require("./visa");
const { getCountryTemperaturesJSON } = require("./temperatures");
const countryTemperatures = require("./output/temperatures.json");

// _.map(countryTemperatures, (value, key) => {
//   console.log("key", key);
// });

getCountryVisasJSON();
// getCountryTemperaturesJSON();
