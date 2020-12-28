const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

const templateRequest = {
  voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
  audioConfig: { audioEncoding: "MP3" },
};

module.exports = async (text) => {
  const request = {
    ...templateRequest,
    input: { text },
  };
  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
};
