const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");
const { v4: uuid } = require("uuid");
const writeToBucket = require("./writeToBucket");
const convertToAudio = require("./convertToAudio");
const convertToText = require("./convertToText");
const tongueTwisters = require("./tongueTwisters");
const getVoices = require("./getVoices");
const defaultVoice = require("./defaultVoice");

const WHITESPACE = /<\/p>(\s)*<p>/g;

const extractParams = (req) =>
  req.query
    ? {
        iterations: req.query.iterations || 1,
        text: req.query.text || tongueTwisters[0],
        voiceName: req.query.voice || defaultVoice.name,
      }
    : {
        iterations: 1,
        text: tongueTwisters[0],
        voiceName: defaultVoice.name,
      };

const roundTrip = (gameId) => async (iteration, text, voiceName) => {
  const voice =
    voiceName === "random"
      ? await randomVoice()
      : voiceName === "english"
      ? await randomEnglishVoice()
      : { ...defaultVoice, name: voiceName };
  const spokenText = await convertToAudio(text, voice);
  const fileName =
    iteration < 9
      ? `${gameId}-0${iteration + 1}`
      : `${gameId}-${iteration + 1}`;
  const [url, heardText] = await Promise.all([
    writeToBucket(fileName, spokenText),
    convertToText(spokenText),
  ]);
  return { initial: text, url, out: heardText, voice };
};

const randomVoice = async () => {
  const voices = await getVoices();
  const randomIndex = Math.floor(Math.random() * voices.length);
  return voices[randomIndex];
};

const randomEnglishVoice = async () => {
  const voices = await getVoices();
  const englishVoices = voices.filter((voice) => voice.name.startsWith("en"));
  const randomIndex = Math.floor(Math.random() * englishVoices.length);
  return englishVoices[randomIndex];
};

const buildHTML = (gameId, results) => {
  const html = results.reduce(
    (html, { initial, url, out, voice }, iteration) =>
      html +
      `<p><h3>Iteration ${iteration + 1}</h3></p>
       <p>Initial text is '${initial}'.</p>
       <p>Spoken text (${
         voice.name
       }) is <audio controls><source src="${url}"></audio></p>
       <p>Heard text is '${out}'</p>`,
    `<html><body><h2>Game ${gameId}</h2>`
  );
  return html.replace(WHITESPACE, "</p><p>") + "</body></html>";
};

module.exports = async (req, res, gameId = uuid()) => {
  try {
    let { iterations, text, voiceName } = extractParams(req);
    const results = [];
    const runIteration = roundTrip(gameId);
    for (let iteration = 0; iteration < iterations; iteration++) {
      const result = await runIteration(iteration, text, voiceName);
      results.push(result);
      text = result.out;
    }
    res.send(buildHTML(gameId, results));
  } catch (err) {
    res.status(500);
    res.json({
      error: JSON.stringify(err, null, 2),
    });
  }
};
