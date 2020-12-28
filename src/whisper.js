const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");
const { v4: uuid } = require("uuid");
const writeToBucket = require("./writeToBucket");
const convertToAudio = require("./convertToAudio");

const playGame = async (req, res, gameId = uuid()) => {
  try {
    const text = "round the rugged rock the ragged rascal ran";
    const audio = await convertToAudio(text);
    const fileName = `${gameId}.mp3`;
    const url = await writeToBucket(fileName, audio);
    res.send(
      `<html><body>Audio output of game stored in file <a href="${url}">${fileName}</a></body></html>`
    );
  } catch (err) {
    res.status(500);
    res.json({
      error: JSON.stringify(err, null, 2),
    });
  }
};

module.exports = {
  playGame,
};
