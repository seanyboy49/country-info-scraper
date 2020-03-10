const fs = require("fs");

const { fetchData } = require("./utility");

var bracketRegex = /\[([^)]+)\]/;

const url =
  "https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens";

const getCountryVisas = async () => {
  console.log("start scraping");

  const $ = await fetchData(url);
  const tables = $(".wikitable");

  // Create a write stream
  const writeStream = fs.createWriteStream("visas.csv");
  writeStream.write("Country|Visa Requirement|Allowed Stay \n");

  // loop over each table
  tables.each((index, element) => {
    const tableRows = $(element).find("tbody tr");

    const filteredRows = tableRows.filter((index, element) => {
      // remove any tr that contain any th in their children
      return element.children[1].name !== "th";
    });

    // loop over filtered rows
    filteredRows.each((index, element) => {
      const rowData = $(element).find("td");

      const country = rowData
        .first()
        .text()
        .trim();

      const visaRequirement = rowData
        .slice(1, 2)
        .text()
        .trim();

      const allowedStay = rowData
        .slice(2, 3)
        .text()
        .trim();

      const plainVisaRequirement = visaRequirement.replace(bracketRegex, "");
      const plainAllowedStay = allowedStay.replace(bracketRegex, "");

      writeStream.write(
        `${country}|${plainVisaRequirement}|${plainAllowedStay} \n`
      );
    });
  });

  console.log("scraping done");
};

getCountryVisas();
