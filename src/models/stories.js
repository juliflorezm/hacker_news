const client = require("../db/redis");

const get_topstories = () => {
  return new Promise((resolve, reject) => {
    client.get("topstories", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const hashget = (key) => {
  return new Promise((resolve, reject) => {
    client.hgetall(key, (err, object) => {
      if (err) {
        reject(err);
      } else {
        resolve(object);
      }
    });
  });
};

const getKeys = () => {
  return new Promise((resolve, reject) => {
    client.keys("*", (err, keys) => {
      if (err) {
        reject(err);
      } else {
        resolve(keys);
      }
    });
  });
};

module.exports = {
  getKeys,
  get_topstories,
  hashget,
};
