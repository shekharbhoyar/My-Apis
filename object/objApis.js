import { Router } from "express";
export const objApis = Router();

let obj = {
  count: 0,
  count1: 0,
  count2: 0,
};

objApis.get("/incre-count", (req, res) => {
  obj.count = obj.count + 1;
  res.send(obj);
});
objApis.get("/decre-count", (req, res) => {
  obj.count = obj.count - 1;
  res.send(obj);
});
objApis.get("/incre-count1", (req, res) => {
  obj.count1 = obj.count1 + 1;
  res.send(obj);
});

objApis.get("/decre-count1", (req, res) => {
  obj.count1 = obj.count1 - 1;
  res.send(obj);
});

objApis.get("/incre-count2", (req, res) => {
  obj.count2 = obj.count2 + 1;
  res.send(obj);
});
objApis.get("/decre-count2", (req, res) => {
  obj.count2 = obj.count2 - 1;
  res.send(obj);
});
