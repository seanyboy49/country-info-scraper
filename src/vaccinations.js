const fs = require("fs");
const _ = require("lodash");

const { fetchData } = require("./utility");
const countries = require("./output/visas.json");

const regex = /\s/g;

const url = country => {
  const regex = /\s/g;
  const hyphenatedCountry = country.replace(regex, "-");

  return `https://wwwnc.cdc.gov/travel/destinations/traveler/none/${hyphenatedCountry}`;
};

const getCountryVaccinations = async () => {
  console.log("start scraping");

  // Create a data {} to write to file
  const data = {};

  await Promise.all(
    _.map(countries, async (v, country) => {
      const urlWithCountry = url(country);

      try {
        const $ = await fetchData(urlWithCountry);

        const diseases = $("td[class=traveler-disease]")
          .text()
          .trim();
        data[country] = diseases;
        console.log("success", country);
      } catch (error) {
        data[country] = "N/A";
        console.log("error", country);
      }
    })
  );

  fs.writeFileSync("output/vaccinations.json", JSON.stringify(data));
  console.log("scraping done");
};

getCountryVaccinations();
