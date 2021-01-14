const express = require("express");
const playGame = require("./src/playGame");
const listVoices = require("./src/listVoices");
const whisperDocs = require("./src/whisperDocs");

const app = express();
app.get("/whispers/playGame", (req, res) => playGame(req, res));
app.get("/whispers/listVoices", listVoices);
app.get("/whispers/", whisperDocs);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`whispers listening on port ${port}`);
});
