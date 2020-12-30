const textToSpeech = require("@google-cloud/text-to-speech");

let promise;

module.exports = () => {
  if (!promise) {
    const client = new textToSpeech.TextToSpeechClient();
    promise = client.listVoices().then(([{ voices }]) =>
      voices.map((voice) => ({
        name: voice.name,
        languageCode: voice.languageCodes[0],
      }))
    );
  }
  return promise;
};
