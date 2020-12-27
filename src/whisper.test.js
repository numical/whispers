const { test } = require("tap");
const td = require("testdouble");

const bucket = td.replace("./bucket");
const { playGame } = require("./whisper");

test("play game successfully", async (t) => {
  const req = {};
  const res = {
    send: td.func(),
  };
  td.when(
    bucket.writeFileToBucket(
      "testGameId1.txt",
      "Played game 'testGameId1' of Whispers."
    )
  ).thenResolve(Promise.resolve("testUrl"));
  await playGame(req, res, "testGameId1");
  td.verify(
    res.send(
      `<html><body>Result of game stored in file <a href="testUrl">testGameId1.txt</a></body></html>`
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
    bucket.writeFileToBucket(
      "testGameId2.txt",
      "Played game 'testGameId2' of Whispers."
    )
  ).thenReject(new Error());
  await playGame(req, res, "testGameId2");
  td.verify(res.status(500));
  td.verify(res.json({ error: "{}" }));
  t.end();
});
