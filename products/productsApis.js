import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";
export const productsApis = Router();

productsApis.get("/products/abc", async (req, res) => {
  console.log("im inside function");
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");
  console.log("connection is good");

  const dbResponse = await db.collection("products").find().toArray();
  console.log("GET  /get-all-users api called successfully");
  res.json(dbResponse);
});

productsApis.post("/create-products", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");

  const dbResponse = await db.collection("products").insertOne(req.body);
  console.log(" POST /create-products api called successfully");
  res.json(dbResponse);
});

productsApis.patch("/update-products", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");
  // const matcher = { _id: new ObjectId(req.params.id) };
  // const updateQuery = { $set: req.body };

  if (req.query.brand) {
    const matcher = { brand: req.query.brand };
    const updateQuery = { $set: req.body };
    const dbResponse = await db
      .collection("products")
      .updateOne(matcher, updateQuery);
    console.log("Patch /update-products api called successfully");
    res.json(dbResponse);
  } else {
    res.json(dbResponse);
  }
});

productsApis.delete("/delete-products", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");
  console.log("DELETE /delete-products api called successfully");
  const dbResponse = await db
    .collection("products")
    .deleteOne({ brand: req.query.brand });
  res.json(dbResponse);
});
