import { Router } from "express";
export const mathsApis=Router()

mathsApis.get("/:number", (req, res) => {
  res.json({ square: req.params.number * req.params.number });
})

mathsApis.get("/", (req, res) => {
  res.json({ area: req.query.height * req.query.width });
})