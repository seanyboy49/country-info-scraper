const { fetchData } = require("./utility");

const url =
  "https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens";

const getCountryVisas = async () => {
  console.log("start scraping");

  const $ = await fetchData(url);
  const tables = $("table");

  console.log(tables);
};

getCountryVisas();
