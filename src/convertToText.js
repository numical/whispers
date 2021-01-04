const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient();

module.exports = async (audio) => {
  const request = {
    config: {
      enableAutomaticPunctuation: true,
      encoding: "LINEAR16",
      languageCode: "en-US",
      model: "default",
      sampleRateHertz: 24000,
    },
    audio: {
      content: audio,
    },
  };
  const start = Date.now();
  const [response] = await client.recognize(request);
  console.log(`Elapsed convert to text time: ${Date.now() - start} ms.`);
  return response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
};
