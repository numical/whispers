const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient();

const templateRequest = {
  config: {
    enableAutomaticPunctuation: true,
    encoding: "LINEAR16",
    languageCode: "en-US",
    model: "default",
    sampleRateHertz: 16000,
  },
};

module.exports = async (audio) => {
  const request = {
    ...templateRequest,
    audio: {
      content: audio,
    },
  };
  const [response] = await client.recognize(request);
  console.log(JSON.stringify(response, null, 2));
  return response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
};
