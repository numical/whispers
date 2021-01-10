const { test } = require("tap");
const td = require("testdouble");

const writeToBucket = td.replace("./writeToBucket");
const convertToAudio = td.replace("./convertToAudio");
const convertToText = td.replace("./convertToText");
const playGame = require("./playGame");
const tongueTwisters = require("./tongueTwisters");
const defaultVoice = require("./defaultVoice");
const Timings = require("./Timings");

test("play game with defaults", async (t) => {
  const text = tongueTwisters[0];
  const audio = [];
  const req = {};
  const res = {
    send: td.func(),
  };
  td.when(convertToAudio(text, defaultVoice)).thenResolve(audio);
  td.when(writeToBucket("testGameId1-01", audio)).thenResolve("testUrl");
  td.when(convertToText(audio)).thenResolve(text);
  await playGame(req, res, { gameId: "testGameId1", timings: Timings.DUMMY });
  td.verify(
    res.send(
      `<html><body><h2>Game testGameId1</h2><p><h3>Iteration 1</h3></p><p>Initial text is '${text}'.</p><p>Spoken text (en-IN-Standard-C) is <audio controls><source src="testUrl"></audio></p><p>Heard text is '${text}'</p><p>DUMMY TIMINGS</p></body></html>`
    )
  );
  t.end();
});

test("play game with passed text", async (t) => {
  const text = tongueTwisters[1];
  const audio = [];
  const req = {
    query: {
      text,
    },
  };
  const res = {
    send: td.func(),
  };
  td.when(convertToAudio(text, defaultVoice)).thenResolve(audio);
  td.when(writeToBucket("testGameId1-01", audio)).thenResolve("testUrl");
  td.when(convertToText(audio)).thenResolve(text);
  await playGame(req, res, { gameId: "testGameId1", timings: Timings.DUMMY });
  td.verify(
    res.send(
      `<html><body><h2>Game testGameId1</h2><p><h3>Iteration 1</h3></p><p>Initial text is '${text}'.</p><p>Spoken text (en-IN-Standard-C) is <audio controls><source src="testUrl"></audio></p><p>Heard text is '${text}'</p><p>DUMMY TIMINGS</p></body></html>`
    )
  );
  t.end();
});

test("play game with passed text and iterations", async (t) => {
  const text = tongueTwisters[1];
  const audio = [];
  const req = {
    query: {
      iterations: 3,
      text,
    },
  };
  const res = {
    send: td.func(),
  };
  td.when(convertToAudio(text, defaultVoice)).thenResolve(audio);
  td.when(writeToBucket("testGameId1-01", audio)).thenResolve("testUrl1");
  td.when(writeToBucket("testGameId1-02", audio)).thenResolve("testUrl2");
  td.when(writeToBucket("testGameId1-03", audio)).thenResolve("testUrl3");
  td.when(convertToText(audio)).thenResolve(text);
  await playGame(req, res, { gameId: "testGameId1", timings: Timings.DUMMY });
  td.verify(
    res.send(
      `<html><body><h2>Game testGameId1</h2><p><h3>Iteration 1</h3></p><p>Initial text is '${text}'.</p><p>Spoken text (en-IN-Standard-C) is <audio controls><source src="testUrl1"></audio></p><p>Heard text is '${text}'</p><p><h3>Iteration 2</h3></p><p>Initial text is '${text}'.</p><p>Spoken text (en-IN-Standard-C) is <audio controls><source src="testUrl2"></audio></p><p>Heard text is '${text}'</p><p><h3>Iteration 3</h3></p><p>Initial text is '${text}'.</p><p>Spoken text (en-IN-Standard-C) is <audio controls><source src="testUrl3"></audio></p><p>Heard text is '${text}'</p><p>DUMMY TIMINGS</p></body></html>`
    )
  );
  t.end();
});

test("play game but errors", async (t) => {
  const text = tongueTwisters[0];
  const req = {};
  const res = {
    status: td.func(),
    json: td.func(),
  };
  td.when(convertToAudio(text, defaultVoice)).thenReject(new Error());
  await playGame(req, res, { gameId: "testGameId2", timings: Timings.DUMMY });
  td.verify(res.status(500));
  td.verify(res.json({ error: "Error"}));
  t.end();
});
