const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");
const { v4: uuid } = require("uuid");
const { writeFileToBucket } = require("./bucket");

const playGame = async (req, res, gameId = uuid()) => {
  try {
    const contents = `Played game '${gameId}' of Whispers.`;
    const fileName = `${gameId}.txt`;
    const url = await writeFileToBucket(fileName, contents);
    res.send(
      `<html><body>Result of game stored in file <a href="${url}">${fileName}</a></body></html>`
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
