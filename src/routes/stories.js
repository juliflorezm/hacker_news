const express = require("express");

const client = require("../../src/db/redis");
const stories = require("../../utils/search");
const top_stories = require("../../utils/top_stories");
const item_detail = require("../../utils/item_detail");
const { getKeys, get_topstories, hashget } = require("../models/stories");
const router = new express.Router();

router.get("/stories", async (req, res) => {
  const result = await getKeys().then((data) => {
    return data;
  });

  const values = result
    .filter((k) => k !== "topstories")
    .map((key) => {
      return hashget(key);
    });

  const response = await Promise.all(values);

  if (response.length !== 0) {
    // console.log("response from redis");
    return res.send(response);
  }

  // console.log("response from news");
  const data = await get_topstories();

  const fields = {
    index: parseInt(req.query.i),
    n: parseInt(req.query.n),
    top: [],
  };

  if (data) {
    // console.log("topstories from redis");
    fields.top = data;
  } else {
    // console.log("topstories from API");
    const top = await top_stories().then((r) => r);

    client.set("topstories", JSON.stringify(top), (e, status) => {
      if (e) return res.send(e);

      client.expire("topstories", parseInt(process.env.timeout));
    });
    fields.top = top;
  }

  const promises = stories(fields).map((id_story) => {
    return item_detail(id_story);
  });

  const search = await Promise.all(promises);

  const response_news = search.map(({ id, title }) => {
    const obj = { ID: id, titulo: title };
    client.hmset(id, obj, (e, status) => {
      client.expire(id, parseInt(process.env.timeout));
    });
    return obj;
  });

  res.status(201).send(response_news);
});

module.exports = router;
