const fs = require("fs");

const { fetchData } = require("./utility");

const url =
  "https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature";

const getCountryTemperatures = async () => {
  console.log("start scraping");

  const $ = await fetchData(url);
  const tables = $("table");

  // Create a write stream
  const writeStream = fs.createWriteStream("temperatures.csv");
  writeStream.write("Country|City|Temperatures \n");

  // Loop over each continent table
  tables.each((index, element) => {
    const tableRows = $(element).find("tbody tr");

    // Exclude the first row since it's a header
    const lineItems = tableRows.slice(1);

    // Iterate over the country/city data
    lineItems.each((index, element) => {
      const tableData = $(element).find("td");

      const country = tableData
        .first()
        .text()
        .trim();
      const city = tableData
        .slice(1, 2)
        .text()
        .trim();
      const temperaturesText = tableData
        .slice(2)
        .text()
        .trim();

      const farehenheitRegex = /(?<=\()(.*?)(?=\))/g;
      const farenheitTemperatures = temperaturesText.match(farehenheitRegex);

      const temperatures = farenheitTemperatures.join();
      writeStream.write(`${country}|${city}|${temperatures} \n`);
    });
  });

  console.log("scraping done");
};

getCountryTemperatures();
