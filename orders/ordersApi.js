import { Router } from "express";
import { MongoClient } from "mongodb";
export const ordersApis = Router();

ordersApis.get("/get-all-orders", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("orders");
  const dbResponse = await db.collection("orderlist").find({}).toArray();
  console.log(dbResponse);
  res.json(dbResponse);
});

ordersApis.post("/insert-orders", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("orders");
  const dbResponse = await db.collection("orderlist").insertOne(req.body);
  res.json(dbResponse);
});

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
