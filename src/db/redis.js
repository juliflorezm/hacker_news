let redis = require("redis");

const client = redis.createClient({
  host: process.env.redis_host,
  port: process.env.redis_port,
});

client.on("error", (error) => {
  console.log(error);
});

// client.keys("*", (err, keys) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(keys);
//   keys.map((key) => {
//     client.del(key, (err, object) => {
//       if (err) {
//         console.log(error);
//       }
//       console.log(object);
//     });
//   });
// });

module.exports = client;
