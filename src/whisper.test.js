const { test } = require("tap");
const td = require("testdouble");

const writeToBucket = td.replace("./writeToBucket");
const convertToAudio = td.replace("./convertToAudio");
const { playGame } = require("./whisper");

test("play game successfully", async (t) => {
  const audio = [];
  const req = {};
  const res = {
    send: td.func(),
  };
  td.when(
    convertToAudio("round the rugged rock the ragged rascal ran")
  ).thenResolve(audio);
  td.when(writeToBucket("testGameId1.mp3", audio)).thenResolve("testUrl");
  await playGame(req, res, "testGameId1");
  td.verify(
    res.send(
      `<html><body>Audio output of game stored in file <a href="testUrl">testGameId1.mp3</a></body></html>`
    )
  );
  t.end();
});

test("play game but errors", async (t) => {
  const req = {};
  const res = {
    status: td.func(),
    json: td.func(),
  };
  td.when(
    convertToAudio("round the rugged rock the ragged rascal ran")
  ).thenReject(new Error());
  await playGame(req, res, "testGameId2");
  td.verify(res.status(500));
  td.verify(res.json({ error: "{}" }));
  t.end();
});
