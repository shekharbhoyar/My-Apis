import { Router } from "express";
import { MongoClient } from "mongodb";
import { body, ExpressValidator, validationResult } from "express-validator";
export const ordersApis = Router();

ordersApis.get("/get-all-orders", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("orders");
  const dbResponse = await db.collection("orderlist").find({}).toArray();
  console.log(dbResponse);
  res.json(dbResponse);
});

ordersApis.post(
  "/insert-orders",
  [
    body("categoryName")
      .isString()
      .withMessage("must be string")
      .isLength({ min: 3, max: 50 })
      .withMessage("must be 3-50 characters long")
      .notEmpty()
      .withMessage("should not be empty"),
    body("model")
      .isString()
      .withMessage("must be string")
      .notEmpty()
      .withMessage("must not empty")
      .isLength({ min: 3, max: 50 })
      .withMessage("must be 3-50 character long"),
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const client = new MongoClient("mongodb://localhost:27017/");
      const connection = await client.connect();
      const db = connection.db("orders");

      //cheking whether categoryName exists
      const data = await db
        .collection("orderlist")
        .find({
          categoryName: { $regex: req.body.categoryName, $options: "i" },
        })
        .toArray();
      if (data.length > 0) {
        return res.json({ massege: "CategoryName already exist" });
      } else {// inserting categoryName if not exists
        const data = await db.collection("orderlist").insertOne(req.body);
        return res.json(data);
      }
    } else {
      res.json({ errors: result.array() });
    }
  }
);

ordersApis.patch("/update-orders", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("orders");
  const dbResponse = await db
    .collection("orderlist")
    .updateOne({ model: req.query.model }, { $unset: req.body });
  res.json(dbResponse);
});

ordersApis.delete("/delete-orders", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("orders");
  const dbResponse = await db
    .collection("orderlist")
    .deleteOne({ model: req.query.model });
  res.json(dbResponse);
});
