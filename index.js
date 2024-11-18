const express = require("express");
var bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const env = require("dotenv");
const mongoose = require("mongoose");
const userRoutes= require("./routers/user")
env.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const jobRouter= require("./routers/job");

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/user", userRoutes);
app.use("/api/job", jobRouter);

app.listen(PORT, () => {
  console.log("server is runing");

  mongoose
    .connect(MONGO_URI, { 
        useNewUrlParser: true, useUnifiedTopology: true 
    }).then(() => {
      console.log("connected to the mongodb");
    }).catch((err)=>{
        console.log("error");
    });
});
