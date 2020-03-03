const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const wikiUrl =
  "https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature";

const remoteUrl = "https://remoteok.io/";

const fetchData = async url => {
  const result = await axios.get(url);

  return cheerio.load(result.data);
};

const getCountryTemperatures = async () => {
  const cities = {};

  const $ = await fetchData(wikiUrl);
  const firstTableRows = $("table:first-of-type tbody tr");

  // Exclude the first row since it's a header
  const tableData = firstTableRows.slice(1);

  // Iterate over the country/city data
  tableData.each((index, element) => {
    const tableDatas = $(element).find("td");

    const country = tableDatas.first().text();
    const city = tableDatas.slice(1, 2).text();
    const temperaturesText = tableDatas.slice(2).text();

    const farehenheitRegex = /(?<=\()(.*?)(?=\))/g;
    const farenheitTemperatures = temperaturesText.match(farehenheitRegex);

    console.log("country: ", country);
    console.log("city: ", city);
    console.log("farenheitTemperatures: ", farenheitTemperatures.join());
  });

  // const firstTableBody = firstTable.find("tbody");
  // const firstTableBodyRows = firstTableBody.find("tr");
  // const firstCountry = firstTableBodyRows.html();

  //   const firstTableRows = firstTableBody.children.text();
  // .find("tr")
  // .html();

  //   const cityRows = $("table > tbody > tr").text();
  //   const jsonString = JSON.stringify(cityRows);
  //   fs.writeFileSync("./output.json", jsonString, "utf-8");
};

getCountryTemperatures();
