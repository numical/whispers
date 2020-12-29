const { test } = require("tap");
const td = require("testdouble");

const writeToBucket = td.replace("./writeToBucket");
const convertToAudio = td.replace("./convertToAudio");
const convertToText = td.replace("./convertToText");
const { playGame } = require("./whisper");
const tongueTwisters = require("./tongueTwisters");

const text = tongueTwisters[0];

test("play game successfully", async (t) => {
  const audio = [];
  const req = {};
  const res = {
    send: td.func(),
  };
  td.when(convertToAudio(text)).thenResolve(audio);
  td.when(writeToBucket("testGameId1", audio)).thenResolve("testUrl");
  td.when(convertToText(audio)).thenResolve(text);
  await playGame(req, res, "testGameId1");
  td.verify(
    res.send(
      `<html><body><p>Game testGameId1</p><p>Original text is '${text}'.</p><p>Spoken text is <audio controls><source src="testUrl"></audio></p><p>Heard text is '${text}'</p></body></html>`
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
  td.when(convertToAudio(text)).thenReject(new Error());
  await playGame(req, res, "testGameId2");
  td.verify(res.status(500));
  td.verify(res.json({ error: "{}" }));
  t.end();
});
