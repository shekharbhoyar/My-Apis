import express from "express";
import { countApis } from "./count/countApis.js";
import { arrayApis } from "./arrays/arrayApis.js";
import { objApis } from "./object/objApis.js";
import { mathsApis } from "./basicMath/maths.js";
import { signupApis } from "./users/signupApis.js";
import { productsApis } from "./products/productsApis.js";
import { ordersApis } from "./orders/ordersApi.js";
import { categoriesApi } from "./categories/categoriesApi.js";
import { paymentApi } from "./Payment/paymentApis.js";
import { SECRET_KEY } from "./constant.js";
import jwt from "jsonwebtoken";

const middleware = async (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    console.log("token dosent  exist");
    return res.status(401).json({ message: "unauthorised user" });
  }
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    console.log("token is not verified", error.message);
    return res.status(401).json({ message: "un-authorised user" });
  }
};
const app = express();

app.use(express.json());
app.use("/", signupApis);
app.use("/", middleware, countApis);
app.use("/", middleware, arrayApis);
app.use("/", middleware, objApis);
app.use("/", middleware, mathsApis);
app.use("/", middleware, productsApis);
app.use("/", middleware, ordersApis);
app.use("/", middleware, categoriesApi);
app.use("/", middleware, paymentApi);

app.listen(3000, () => {
  console.log("server is running on 3000");
});
