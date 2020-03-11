const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async url => {
  const result = await axios.get(url);

  return cheerio.load(result.data);
};

module.exports = {
  fetchData
};
