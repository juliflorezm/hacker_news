const request = require("request");

const top_stories = () => {
  const url =
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response, body) => {
      if (error) {
        reject("Can not commect to server.");
      }
      resolve(body);
    });
  });
};

module.exports = top_stories;
