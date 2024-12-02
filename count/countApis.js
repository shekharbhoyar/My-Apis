import { Router } from "express";

export const countApis = Router();

let count = 0;
countApis.get("/get-count", (req, res) => {
  res.send({ count: count });
});

countApis.get("/increment", (req, res) => {
  count = count + 1;
  res.send({ count: count });
});

countApis.get("/decrement", (req, res) => {
  count = count - 1;
  res.send({ count: count });
});
