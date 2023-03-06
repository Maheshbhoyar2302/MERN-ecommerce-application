const express = require("express");
const app = express();

const errorMiddlerware = require("./middleware/error")

app.use(express.json())

//routes imports
const product = require("./routes/productRoute")

app.use("/api/v1", product)

//middleware for error
app.use(errorMiddlerware)


module.exports = app;

