import express from "express";
import { countApis } from "./count/countApis.js";
import { arrayApis } from "./arrays/arrayApis.js";
import { objApis } from "./object/objApis.js";
import { mathsApis } from "./basicMath/maths.js";
import { signupApis } from "./users/signupApis.js";
import { productsApis } from "./products/productsApis.js";

const app = express();

app.use(express.json());

app.use("/", countApis);
app.use("/", arrayApis);
app.use("/", objApis);
app.use("/", mathsApis);
app.use("/", signupApis);
app.use("/", productsApis);

app.listen(3000, () => {
  console.log("server is running on 3000");
});
