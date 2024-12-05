import { Router } from "express";
import { MongoClient } from "mongodb";
export const categoriesApi = Router();

categoriesApi.get("/categories", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("categories");
  const dbResponse = await db.collection("categoryList").find({}).toArray();
  res.json({ message: "list of cataegories", data: dbResponse });
});

categoriesApi.post("/intake-category", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("categories");
  const dbResponse = await db.collection("categoryList").insertOne(req.body);
  res.json({ message: "created", data: dbResponse });
});
