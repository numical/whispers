const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");
const { v4: uuid } = require("uuid");
const writeToBucket = require("./writeToBucket");
const convertToAudio = require("./convertToAudio");
const convertToText = require("./convertToText");
const tongueTwisters = require("./tongueTwisters");

const playGame = async (req, res, gameId = uuid()) => {
  try {
    const originalText = tongueTwisters[0];
    const spokenText = await convertToAudio(originalText);
    const [url, heardText] = await Promise.all([
      writeToBucket(gameId, spokenText),
      convertToText(spokenText),
    ]);
    res.send(
      `<html><body><p>Game ${gameId}</p><p>Original text is '${originalText}'.</p><p>Spoken text is <audio controls><source src="${url}"></audio></p><p>Heard text is '${heardText}'</p></body></html>`
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
