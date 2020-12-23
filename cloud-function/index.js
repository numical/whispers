// const { playGame } = require('../src/whisper');

const playGame = (req, res) => {
  res.send("Played a game of Whispers.");
};

exports.playGame = playGame;