const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://www.axios.com/";

const fetchData = async url => {
  let result;
  try {
    result = await axios.get(url);
  } catch (error) {
    console.log(error);
  }

  return cheerio.load(result);
};

const parseResults = async () => {
  const $ = await fetchData(url);
  console.log($);
};

parseResults();
