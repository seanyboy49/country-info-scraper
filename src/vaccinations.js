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

        const diseases = $("td[class=traveler-disease]");

        // Construct a string by iterating through each disease and trimming white space \n
        const diseaseString = diseases
          .map((index, disease) => {
            return (trimmedDiseaseText = $(disease)
              .text()
              .trim());
          })
          .get()
          .join(", ");

        data[country] = diseaseString;
        console.log("success", country);
      } catch (error) {
        data[country] = "N/A";
        console.log("error", country);
      }
    })
  );

  fs.writeFileSync("src/output/vaccinations.json", JSON.stringify(data));
  console.log("scraping done");
};

getCountryVaccinations();
