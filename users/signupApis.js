import { Router } from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constant.js";
export const signupApis = Router();

// let usersArray = [];

signupApis.post("/signup-user", async (req, res) => {
  // usersArray.push(req.body);
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");
  const data = await db.collection("users").insertOne(req.body);
  res.json(data);
});

signupApis.get("/get-all-users", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");

  if (req.query.priceGreaterThan) {
    const data = await db
      .collection("users")
      .find({
        grade: {
          $gt: Number(req.query.priceGreaterThan),
          $lt: Number(req.query.priceLessThan),
        },
      })
      .toArray();
    console.log("GET /get-all-users called");
    res.json({ massege: "created", data: data });
  } else {
    const data = await db.collection("users").find().toArray();
    console.log("GET /get-all-users called");
    res.json({ massege: "created", data: data });
  }
});

signupApis.get("/get-user/:id", async (req, res) => {
  // usersArray.push(req.body);
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");
  const data = await db
    .collection("users")
    .find({ _id: new ObjectId(req.params.id) })
    .toArray();
  res.json(data);
});

signupApis.delete("/delete-user/:id", async (req, res) => {
  // usersArray.push(req.body);
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");
  const data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

signupApis.patch("/update-user/:id", async (req, res) => {
  // usersArray.push(req.body);
  const client = new MongoClient("mongodb://localhost:27017/");
  const connection = await client.connect();
  const db = connection.db("mothadata");

  const matcher = { _id: new ObjectId(req.params.id) };
  const updateQuery = {
    $set: req.body,
  };
  const dbResponse = await db
    .collection("users")
    .updateOne(matcher, updateQuery);
  res.json(dbResponse);
});

signupApis.get("/generate-token", async (req, res) => {
  const payload = { name: req.headers.name, password: req.headers.password };
  const token = jwt.sign(payload, SECRET_KEY);
  res.json({ token });
});
