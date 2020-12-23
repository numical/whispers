const { test } = require("tap");
const td = require("testdouble");
const { playGame } = require("./whisper");

test("play game", (t) => {
  const req = {};
  const res = {
    send: td.func(),
  };
  playGame(req, res);
  td.verify(res.send("Played a game of Whispers."));
  t.end();
});
