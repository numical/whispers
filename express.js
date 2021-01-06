const express = require("express");
const playGame = require("./src/playGame");
const listVoices = require("./src/listVoices");

const app = express();
app.get("/playGame", (req, res) => playGame(req, res));
app.get("/listVoices", listVoices);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`whispers listening on port ${port}`);
});
