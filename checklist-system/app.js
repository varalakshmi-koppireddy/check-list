const express = require("express");
const axios = require("axios");
const checklistRules = require("./config/checklistRules");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const API_URL =
  "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    const results = checklistRules.map((rule) => ({
      name: rule.name,
      status: rule.condition(data),
    }));

    res.render("dashboard", { results });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Failed to fetch application data.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
