require("../src/db/redis");
const app = require("./app");
const port = process.env.port;

app.listen(port, () => console.log("Server running on port " + port));
