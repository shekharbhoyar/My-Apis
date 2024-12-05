import { Router } from "express";
import { MongoClient } from "mongodb";
export const paymentApi = Router();
paymentApi.get("/abc/all-payments", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("payments");
  const dbResponse = await db.collection("paymentList").find({}).toArray();
  console.log("dbResponse:", dbResponse);
  res.json({ message: "created", data: dbResponse });
});

paymentApi.post("/insert-payments", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("payments");
  const dbResponse = await db.collection("paymentList").insertOne(req.body);
  console.log("dbResponse:", dbResponse);
  res.json({ message: "created", data: dbResponse });
});
