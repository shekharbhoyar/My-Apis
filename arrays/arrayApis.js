import { Router } from "express";
export const arrayApis = Router();

let array = [];
arrayApis.get("/insert-value", (req, res) => {
  array.push("apple");
  res.send(array);
});

arrayApis.get("/delete-value", (req, res) => {
  array.pop();
  res.send(array);
});
