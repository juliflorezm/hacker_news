const express = require("express");
const storiesRouter = require("./routes/stories");

const app = express();

app.use(express.json());
app.use(storiesRouter);

module.exports = app;
