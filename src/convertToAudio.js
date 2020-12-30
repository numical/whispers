const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

module.exports = async (text, voice) => {
  const request = {
    voice,
    audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 24000 },
    input: { text },
  };
  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
};
