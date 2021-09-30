const request = require("request");

const item_detail = (id) => {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response, body) => {
      if (error) {
        reject("Can not connect to server.");
      }
      resolve(body);
    });
  });
};

module.exports = item_detail;
