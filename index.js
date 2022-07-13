// Required pakages
const express = require("express");
const fs = require("fs");

// Configuring dotenv package for managing API credentials
const dotenv = require("dotenv");
dotenv.config();

// Initializing the express app
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("To create a file, append /create in the url 👆");
});

// Endpoint to create a new file ./files directory
app.post("/create", async (req, res) => {
  try {
    let timestamp = new Date().getTime();
    let today = new Date();
    let day = today.getDay();
    let month = today.getMonth();
    let year = today.getFullYear();
    let date = day + "-" + month + "-" + year;
    var time =
      today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();
    fs.writeFile(`./files/${date}-${time}.txt`, `${timestamp}`, function (err) {
      if (err) throw err;
      console.log("Hurray! File added successfully 🎉");
      res.json({
        message: "Hurray! File added successfully 🎉",
      });
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// Endpoint to receive all the files form ./files directory
app.get("/get-files", (req, res) => {
  try {
    fs.readdir("./files", (err, files) => {
      res.status(200).json({ files });
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// Running the port
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT} 🚀`);
});
