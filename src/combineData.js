const _ = require("lodash");
const fs = require("fs");

const visasJson = require("./output/visas.json");
const temperaturesJSON = require("./output/temperatures.json");
const vaccinationsJSON = require("./output/vaccinations.json");

const sample = `United States|Not Required|None|33.0,35.7,42.9,53.4,62.8,71.8,76.9,75.7,68.4,57.3,48.1,37.9|New York City|224
`;

function combineData(visasJson, temperaturesJSON, vaccinationsJSON) {
  // Create a write stream
  const writeStream = fs.createWriteStream("seedData.txt");
  writeStream.write("Country|Visa|Vaccinations|Temperatures|City \n");

  // Use visas as source of truth
  _.map(visasJson, (value, key) => {
    const country = key;
    const visa = value;

    const vaccinations = vaccinationsJSON[country] || "UNDEFINED";

    let city, temperatures;
    try {
      const temperatureKeyValuePair = temperaturesJSON[country];
      const entries = Object.entries(temperatureKeyValuePair)[0];
      const [c, t] = entries;
      city = c;
      temperatures = t.join();
    } catch (error) {
      city = "UNDEFINED";
      temperatures = "UNDEFINED";
    }

    console.log("country", vaccinations);
    // console.log("temperatureKeyValuePair", temperatureKeyValuePair);
    // console.log("entries", entries);
    // console.log("city", city);
    writeStream.write(
      `${country}|${visa}|${vaccinations}|${temperatures}|${city} \n`
    );
  });
}

combineData(visasJson, temperaturesJSON, vaccinationsJSON);
